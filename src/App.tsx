import { useCallback, useMemo, useRef, useState } from 'react';
import { usePosts } from './application/hooks/usePosts';
import { useUsers } from './application/hooks/useUsers';
import type { NewPostInput } from './application/types';
import type { User } from './domain/entities';
import type {
  PostsRepository,
  UsersRepository,
} from './infrastructure/repositories/types';
import { PostComposer } from './presentation/components/PostComposer';
import { PostFeed } from './presentation/components/PostFeed';
import { UserList } from './presentation/components/UserList';
import styles from './App.module.css';

export interface AppProps {
  readonly usersRepository: UsersRepository;
  readonly postsRepository: PostsRepository;
}

const EMPTY_USERS: User[] = [];

export function App({ usersRepository, postsRepository }: AppProps) {
  const { state: usersState, reload: reloadUsers } = useUsers(usersRepository);
  const [query, setQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { state: postsState, addPost, reload: reloadPosts } = usePosts(
    postsRepository,
    selectedUserId,
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const allUsers =
    usersState.status === 'success' ? usersState.data : EMPTY_USERS;

  const filteredUsers = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (needle.length === 0) {
      return allUsers;
    }

    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(needle),
    );
  }, [allUsers, query]);

  const selectedUser =
    usersState.status === 'success' && selectedUserId !== null
      ? (usersState.data.find((user) => user.id === selectedUserId) ?? null)
      : null;

  const totalUsers =
    usersState.status === 'success' ? usersState.data.length : 0;

  const handleSelect = useCallback((user: User) => {
    setSelectedUserId(user.id);
  }, []);

  const focusSearch = useCallback(() => {
    searchRef.current?.focus();
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery('');
    searchRef.current?.focus();
  }, []);

  const handlePublish = useCallback(
    (input: NewPostInput) => {
      addPost(input);
    },
    [addPost],
  );

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <header className={styles.nav}>
        <div className={`${styles.frame} ${styles.navInner}`}>
          <span className={styles.wordmark}>Users &amp; Posts</span>
          <span className={styles.demo}>Demo data</span>
        </div>
      </header>

      <main id="main">
        <section
          className={`${styles.frame} ${styles.masthead}`}
          aria-labelledby="page-title"
        >
          <h1 id="page-title" className={styles.title}>
            Users &amp; Posts.
          </h1>
          <p className={styles.lede}>
            Browse the people. Read their posts. Write your own.
          </p>
        </section>

        <div className={styles.indexBar}>
          <div className={`${styles.frame} ${styles.indexInner}`}>
            <div className={styles.search} role="search">
              <svg
                className={styles.searchIcon}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.5 10.5 14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <label className={styles.srOnly} htmlFor="people-search">
                Find someone
              </label>
              <input
                ref={searchRef}
                id="people-search"
                className={styles.searchInput}
                type="search"
                placeholder="Find someone"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <p className={styles.count} aria-live="polite">
              {usersState.status === 'success' ? (
                query.trim().length > 0 ? (
                  <>
                    <strong>{filteredUsers.length}</strong> of {totalUsers}{' '}
                    people
                  </>
                ) : (
                  <>
                    <strong>{totalUsers}</strong> people
                  </>
                )
              ) : null}
            </p>
          </div>
        </div>

        <div className={`${styles.frame} ${styles.workspace}`}>
          <UserList
            state={usersState}
            users={filteredUsers}
            selectedUserId={selectedUserId}
            query={query}
            onSelect={handleSelect}
            onClearSearch={handleClearSearch}
            onRetry={reloadUsers}
          />

          <div className={styles.feedColumn}>
            <PostFeed
              user={selectedUser}
              state={postsState}
              onRetry={reloadPosts}
              onFindSomeone={focusSearch}
            >
              {selectedUser ? (
                <PostComposer
                  key={selectedUser.id}
                  userName={selectedUser.name}
                  onPublish={handlePublish}
                />
              ) : null}
            </PostFeed>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.frame} ${styles.footerInner}`}>
          <span className={styles.footerBrand}>Users &amp; Posts</span>
          <p className={styles.footerNote}>
            Demo data from JSONPlaceholder. New posts live only in this
            session.
          </p>
        </div>
      </footer>
    </>
  );
}
