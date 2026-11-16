import { useCallback, useEffect, useRef, useState } from 'react';
import type { Post } from '../../domain/entities';
import type { PostsRepository } from '../../infrastructure/repositories/types';
import { isAbortError, toErrorMessage } from '../asyncErrors';
import type { AsyncState, NewPostInput } from '../types';

interface PostsRequest {
  readonly userId: number | null;
  readonly state: AsyncState<Post[]>;
}

export interface UsePostsResult {
  readonly state: AsyncState<Post[]>;
  readonly addPost: (input: NewPostInput) => Post | null;
  readonly reload: () => void;
}

function mergeLocalPosts(
  userId: number,
  remote: Post[],
  local: Post[],
): Post[] {
  return [
    ...local.filter((post) => post.userId === userId),
    ...remote,
  ];
}

export function usePosts(
  repository: PostsRepository,
  userId: number | null,
): UsePostsResult {
  const [request, setRequest] = useState<PostsRequest>(() => ({
    userId,
    state: userId === null ? { status: 'idle' } : { status: 'loading' },
  }));
  const [reloadKey, setReloadKey] = useState(0);
  const localPosts = useRef<Post[]>([]);
  const nextLocalId = useRef(-1);

  useEffect(() => {
    if (userId === null) {
      return;
    }

    const selectedUserId = userId;
    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        const remotePosts = await repository.getPostsByUser(selectedUserId, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setRequest({
            userId: selectedUserId,
            state: {
              status: 'success',
              data: mergeLocalPosts(
                selectedUserId,
                remotePosts,
                localPosts.current,
              ),
            },
          });
        }
      } catch (error) {
        if (controller.signal.aborted || isAbortError(error)) {
          return;
        }

        setRequest({
          userId: selectedUserId,
          state: { status: 'error', error: toErrorMessage(error) },
        });
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [repository, userId, reloadKey]);

  const addPost = useCallback(
    (input: NewPostInput): Post | null => {
      if (userId === null) {
        return null;
      }

      const selectedUserId = userId;
      const title = input.title.trim();
      const body = input.body.trim();

      if (title.length === 0 || body.length === 0) {
        return null;
      }

      const post: Post = {
        id: nextLocalId.current,
        userId: selectedUserId,
        title,
        body,
      };

      nextLocalId.current -= 1;
      localPosts.current = [post, ...localPosts.current];

      setRequest((current) => {
        if (
          current.userId !== selectedUserId ||
          current.state.status !== 'success'
        ) {
          return current;
        }

        return {
          userId: selectedUserId,
          state: {
            status: 'success',
            data: [post, ...current.state.data],
          },
        };
      });

      return post;
    },
    [userId],
  );

  const reload = useCallback(() => {
    if (userId !== null) {
      setRequest({
        userId,
        state: { status: 'loading' },
      });
    }

    setReloadKey((key) => key + 1);
  }, [userId]);

  const state: AsyncState<Post[]> =
    request.userId === userId
      ? request.state
      : userId === null
        ? { status: 'idle' }
        : { status: 'loading' };

  return { state, addPost, reload };
}
