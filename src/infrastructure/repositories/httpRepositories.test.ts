import { describe, expect, it } from 'vitest';
import {
  createHttpRepositories,
  HttpError,
  JSON_PLACEHOLDER_BASE_URL,
} from './httpRepositories';

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('createHttpRepositories', () => {
  it('loads users from the default endpoint and narrows the payload', async () => {
    const calls: string[] = [];
    const fetchImpl: typeof fetch = async (input) => {
      calls.push(String(input));
      return jsonResponse([
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
        },
      ]);
    };

    const { users } = createHttpRepositories({ fetchImpl });

    await expect(users.getUsers()).resolves.toEqual([
      { id: 1, name: 'Leanne Graham', username: 'Bret' },
    ]);
    expect(calls).toEqual([`${JSON_PLACEHOLDER_BASE_URL}/users`]);
  });

  it('builds a user-scoped posts URL from a configured base URL', async () => {
    const calls: string[] = [];
    const fetchImpl: typeof fetch = async (input) => {
      calls.push(String(input));
      return jsonResponse([
        {
          id: 1,
          userId: 7,
          title: 'qui est esse',
          body: 'est rerum tempore vitae',
        },
      ]);
    };

    const { posts } = createHttpRepositories({
      baseUrl: 'https://example.test/',
      fetchImpl,
    });

    await expect(posts.getPostsByUser(7)).resolves.toEqual([
      {
        id: 1,
        userId: 7,
        title: 'qui est esse',
        body: 'est rerum tempore vitae',
      },
    ]);
    expect(calls).toEqual(['https://example.test/posts?userId=7']);
  });

  it('forwards the abort signal to fetch', async () => {
    const controller = new AbortController();
    let received: AbortSignal | null | undefined = undefined;
    const fetchImpl: typeof fetch = async (input, init) => {
      void input;
      received = init?.signal;
      return jsonResponse([]);
    };

    const { users } = createHttpRepositories({ fetchImpl });
    await users.getUsers({ signal: controller.signal });

    expect(received).toBe(controller.signal);
  });

  it('surfaces an abort error instead of swallowing it', async () => {
    const fetchImpl: typeof fetch = (input, init) => {
      void input;
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    };

    const { users } = createHttpRepositories({ fetchImpl });
    const controller = new AbortController();
    const request = users.getUsers({ signal: controller.signal });

    controller.abort();

    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('throws an HttpError for a non-OK response', async () => {
    const fetchImpl: typeof fetch = async () => jsonResponse({}, 503);
    const { users } = createHttpRepositories({ fetchImpl });
    const request = users.getUsers();

    await expect(request).rejects.toBeInstanceOf(HttpError);
    await expect(request).rejects.toMatchObject({ status: 503 });
  });

  it('rejects a malformed payload', async () => {
    const fetchImpl: typeof fetch = async () =>
      jsonResponse([{ id: 1, name: 'Leanne Graham' }]);
    const { users } = createHttpRepositories({ fetchImpl });

    await expect(users.getUsers()).rejects.toThrow('Invalid user at index 0');
  });
});
