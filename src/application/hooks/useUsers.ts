import { useCallback, useEffect, useState } from 'react';
import type { User } from '../../domain/entities';
import type { UsersRepository } from '../../infrastructure/repositories/types';
import { isAbortError, toErrorMessage } from '../asyncErrors';
import type { AsyncState } from '../types';

export interface UseUsersResult {
  readonly state: AsyncState<User[]>;
  readonly reload: () => void;
}

export function useUsers(repository: UsersRepository): UseUsersResult {
  const [state, setState] = useState<AsyncState<User[]>>({ status: 'loading' });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        const users = await repository.getUsers({ signal: controller.signal });

        if (!controller.signal.aborted) {
          setState({ status: 'success', data: users });
        }
      } catch (error) {
        if (controller.signal.aborted || isAbortError(error)) {
          return;
        }

        setState({ status: 'error', error: toErrorMessage(error) });
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [repository, reloadKey]);

  const reload = useCallback(() => {
    setState({ status: 'loading' });
    setReloadKey((key) => key + 1);
  }, []);

  return { state, reload };
}
