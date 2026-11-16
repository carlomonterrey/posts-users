import type { ReactNode } from 'react';
import type { AsyncState } from '../../application/types';
import type { Post, User } from '../../domain/entities';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { SkeletonList } from './Skeleton';
import styles from './PostFeed.module.css';

export interface PostFeedProps {
  readonly user: User | null;
  readonly state: AsyncState<Post[]>;
  readonly onRetry: () => void;
  readonly onFindSomeone?: () => void;
  readonly children?: ReactNode;
}

export function PostFeed({
  user,
  state,
  onRetry,
  onFindSomeone,
  children,
}: PostFeedProps) {
  if (!user) {
    return (
      <EmptyState
        action={
          onFindSomeone ? (
            <Button variant="secondary" onClick={onFindSomeone}>
              Find someone
            </Button>
          ) : undefined
        }
      />
    );
  }

  const posts = state.status === 'success' ? state.data : [];

  return (
    <div className={styles.feed}>
      <header className={styles.person}>
        <Avatar name={user.name} size="lg" />
        <div className={styles.personText}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.handle}>@{user.username}</p>
        </div>
      </header>

      <hr className={styles.rule} />

      {children}

      {state.status === 'loading' || state.status === 'idle' ? (
        <div className={styles.posts}>
          <p className={styles.srOnly} role="status">
            Loading posts.
          </p>
          <SkeletonList layout="post" rows={3} />
        </div>
      ) : state.status === 'error' ? (
        <ErrorState
          title="These posts didn’t load."
          description="Check your connection and try again."
          onRetry={onRetry}
        />
      ) : (
        <section className={styles.posts} aria-labelledby="posts-title">
          <h3 id="posts-title" className={styles.postsTitle}>
            Posts
          </h3>

          {posts.length === 0 ? (
            <div className={styles.noPosts}>
              <p className={styles.noPostsTitle}>No posts yet.</p>
              <p className={styles.noPostsBody}>Write the first one above.</p>
            </div>
          ) : (
            posts.map((post) => (
              <article className={styles.post} key={post.id}>
                {post.id < 0 ? <p className={styles.new}>New</p> : null}
                <h4 className={styles.postTitle}>{post.title}</h4>
                <p className={styles.postBody}>{post.body}</p>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  );
}
