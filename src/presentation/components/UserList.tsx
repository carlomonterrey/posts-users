import { memo } from 'react';
import type { AsyncState } from '../../application/types';
import type { User } from '../../domain/entities';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { ErrorState } from './ErrorState';
import { SkeletonList } from './Skeleton';
import styles from './UserList.module.css';

export interface UserListProps {
  readonly state: AsyncState<User[]>;
  readonly users: User[];
  readonly selectedUserId: number | null;
  readonly query: string;
  readonly onSelect: (user: User) => void;
  readonly onClearSearch: () => void;
  readonly onRetry: () => void;
}

export const UserList = memo(function UserList({
  state,
  users,
  selectedUserId,
  query,
  onSelect,
  onClearSearch,
  onRetry,
}: UserListProps) {
  const trimmedQuery = query.trim();
  const isLoading = state.status === 'loading' || state.status === 'idle';
  const isSuccess = state.status === 'success';

  return (
    <aside
      className={styles.directory}
      aria-labelledby="people-title"
      aria-busy={isLoading}
    >
      <div className={styles.head}>
        <h2 id="people-title" className={styles.title}>
          People
        </h2>
        {isSuccess ? (
          <span className={styles.count} aria-hidden="true">
            {users.length}
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <>
          <p className={styles.srOnly} role="status">
            Loading people.
          </p>
          <SkeletonList layout="person" rows={10} />
        </>
      ) : state.status === 'error' ? (
        <ErrorState
          compact
          title="The directory didn’t load."
          description="Check your connection and try again."
          onRetry={onRetry}
        />
      ) : users.length === 0 ? (
        <div className={styles.noResults} role="status">
          <p className={styles.noResultsTitle}>
            {trimmedQuery
              ? `No one matches “${trimmedQuery}”.`
              : 'No people to show.'}
          </p>
          <p className={styles.noResultsBody}>
            {trimmedQuery
              ? 'Try a different spelling, or clear the search.'
              : 'Try reloading the directory.'}
          </p>
          {trimmedQuery ? (
            <Button variant="text" onClick={onClearSearch}>
              Clear search
            </Button>
          ) : null}
        </div>
      ) : (
        <ul className={styles.list} role="list">
          {users.map((user) => {
            const isSelected = user.id === selectedUserId;

            return (
              <li key={user.id}>
                <button
                  type="button"
                  className={styles.person}
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelect(user)}
                  title={user.name}
                >
                  <Avatar
                    id={user.id}
                    name={user.name}
                    selected={isSelected}
                  />
                  <span className={styles.personText}>
                    <span className={styles.name}>{user.name}</span>
                    <span className={styles.handle}>@{user.username}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
});
