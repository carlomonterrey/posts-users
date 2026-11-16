import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { User } from '../../domain/entities';
import type { UsersRepository } from '../../infrastructure/repositories/types';
import { useUsers } from './useUsers';

const users: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret' },
];

describe('useUsers', () => {
  it('starts loading and resolves to the users', async () => {
    let resolveUsers!: (value: User[]) => void;
    const repository: UsersRepository = {
      getUsers: () =>
        new Promise<User[]>((resolve) => {
          resolveUsers = resolve;
        }),
    };

    const { result } = renderHook(() => useUsers(repository));

    expect(result.current.state).toEqual({ status: 'loading' });

    resolveUsers(users);

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: users,
      });
    });
  });

  it('surfaces a repository error', async () => {
    const repository: UsersRepository = {
      getUsers: async () => {
        throw new Error('Network down');
      },
    };

    const { result } = renderHook(() => useUsers(repository));

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'error',
        error: 'Network down',
      });
    });
  });

  it('reloads after an error', async () => {
    let attempt = 0;
    const repository: UsersRepository = {
      getUsers: async () => {
        attempt += 1;

        if (attempt === 1) {
          throw new Error('Offline');
        }

        return users;
      },
    };

    const { result } = renderHook(() => useUsers(repository));

    await waitFor(() => {
      expect(result.current.state.status).toBe('error');
    });

    act(() => {
      result.current.reload();
    });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: 'success',
        data: users,
      });
    });
  });

  it('aborts the request when the hook unmounts', () => {
    let signal: AbortSignal | undefined;
    const repository: UsersRepository = {
      getUsers: (options) => {
        signal = options?.signal;

        return new Promise<User[]>((_resolve, reject) => {
          options?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      },
    };

    const { unmount } = renderHook(() => useUsers(repository));

    unmount();

    expect(signal?.aborted).toBe(true);
  });
});
