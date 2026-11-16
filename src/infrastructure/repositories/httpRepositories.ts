import type { Post, User } from '../../domain/entities';
import type {
  PostsRepository,
  RepositoryRequestOptions,
  UsersRepository,
} from './types';

export const JSON_PLACEHOLDER_BASE_URL =
  'https://jsonplaceholder.typicode.com';

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export interface HttpRepositories {
  readonly users: UsersRepository;
  readonly posts: PostsRepository;
}

export interface HttpRepositoriesOptions {
  readonly baseUrl?: string;
  readonly fetchImpl?: typeof fetch;
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}${path}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseUsers(value: unknown): User[] {
  if (!Array.isArray(value)) {
    throw new Error('Expected a users array');
  }

  return value.map((entry, index) => {
    if (
      !isRecord(entry) ||
      typeof entry.id !== 'number' ||
      typeof entry.name !== 'string' ||
      typeof entry.username !== 'string'
    ) {
      throw new Error(`Invalid user at index ${index}`);
    }

    return {
      id: entry.id,
      name: entry.name,
      username: entry.username,
    };
  });
}

function parsePosts(value: unknown): Post[] {
  if (!Array.isArray(value)) {
    throw new Error('Expected a posts array');
  }

  return value.map((entry, index) => {
    if (
      !isRecord(entry) ||
      typeof entry.id !== 'number' ||
      typeof entry.userId !== 'number' ||
      typeof entry.title !== 'string' ||
      typeof entry.body !== 'string'
    ) {
      throw new Error(`Invalid post at index ${index}`);
    }

    return {
      id: entry.id,
      userId: entry.userId,
      title: entry.title,
      body: entry.body,
    };
  });
}

async function requestJson<T>(
  url: string,
  parse: (value: unknown) => T,
  fetchImpl: typeof fetch,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetchImpl(url, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return parse(await response.json());
}

const defaultFetch: typeof fetch = (input, init) =>
  globalThis.fetch(input, init);

class HttpUsersRepository implements UsersRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly fetchImpl: typeof fetch,
  ) {}

  async getUsers(options: RepositoryRequestOptions = {}): Promise<User[]> {
    return requestJson(
      joinUrl(this.baseUrl, '/users'),
      parseUsers,
      this.fetchImpl,
      options.signal,
    );
  }
}

class HttpPostsRepository implements PostsRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly fetchImpl: typeof fetch,
  ) {}

  async getPostsByUser(
    userId: number,
    options: RepositoryRequestOptions = {},
  ): Promise<Post[]> {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new RangeError('userId must be a positive integer');
    }

    return requestJson(
      joinUrl(this.baseUrl, `/posts?userId=${userId}`),
      parsePosts,
      this.fetchImpl,
      options.signal,
    );
  }
}

export function createHttpRepositories({
  baseUrl = JSON_PLACEHOLDER_BASE_URL,
  fetchImpl = defaultFetch,
}: HttpRepositoriesOptions = {}): HttpRepositories {
  return {
    users: new HttpUsersRepository(baseUrl, fetchImpl),
    posts: new HttpPostsRepository(baseUrl, fetchImpl),
  };
}

export const httpRepositories = createHttpRepositories();
