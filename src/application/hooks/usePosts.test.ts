import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Post } from '../../domain/entities';
import type { PostsRepository } from '../../infrastructure/repositories/types';
import { usePosts } from './usePosts';

const remotePost: Post = {
  id: 1,
  userId: 1,
  title: 'A remote post',
  body: 'Loaded from the repository.',
};

describe('usePosts', () => {
  it('is idle when no user is selected', () => {
    const repository: PostsRepository = {
      getPostsByUser: async () => [],
    };

    const { result } = renderHook(() => usePosts(repository, null));

    expect(result.current.state).toEqual({ status: 'idle' });
  });

  it('loads posts when a user is selected', async () => {
    const repository: PostsRepository = {
      getPostsByUser: async () => [remotePost],
    };

    const { result, rerender } = renderHook(
      ({ userId }: { userId: number | null }) => usePosts(repository, userId),
      { initialProps: { userId: null as number | null } },
    );

    rerender({ userId: 1 });

    expect(result.current.state).toEqual({ status: 'loading' });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: [remotePost],
      });
    });
  });

  it('prepends a local post and keeps it across user switches', async () => {
    const repository: PostsRepository = {
      getPostsByUser: async (userId) => (userId === 1 ? [remotePost] : []),
    };

    const { result, rerender } = renderHook(
      ({ userId }: { userId: number | null }) => usePosts(repository, userId),
      { initialProps: { userId: 1 as number | null } },
    );

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: [remotePost],
      });
    });

    let created: Post | null = null;

    act(() => {
      created = result.current.addPost({
        title: '  A local post  ',
        body: '  Written in this session.  ',
      });
    });

    if (!created) {
      throw new Error('Expected a local post');
    }

    expect(created).toMatchObject({
      userId: 1,
      title: 'A local post',
      body: 'Written in this session.',
    });

    expect(result.current.state).toEqual({
      status: 'success',
      data: [created, remotePost],
    });

    rerender({ userId: 2 });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: [],
      });
    });

    rerender({ userId: 1 });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: [created, remotePost],
      });
    });
  });

  it('aborts the previous request when the selected user changes', () => {
    const signals: AbortSignal[] = [];
    const repository: PostsRepository = {
      getPostsByUser: (_userId, options) => {
        const signal = options?.signal;

        if (signal) {
          signals.push(signal);
        }

        return new Promise<Post[]>((_resolve, reject) => {
          signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      },
    };

    const { rerender } = renderHook(
      ({ userId }: { userId: number | null }) => usePosts(repository, userId),
      { initialProps: { userId: 1 as number | null } },
    );

    rerender({ userId: 2 });

    expect(signals[0]?.aborted).toBe(true);
  });

  it('surfaces a posts error', async () => {
    const repository: PostsRepository = {
      getPostsByUser: async () => {
        throw new Error('Posts failed');
      },
    };

    const { result } = renderHook(() => usePosts(repository, 1));

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'error',
        error: 'Posts failed',
      });
    });
  });
});
