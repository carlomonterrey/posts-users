import type { Post, User } from '../../domain/entities';

export interface RepositoryRequestOptions {
  readonly signal?: AbortSignal;
}

export interface UsersRepository {
  getUsers(options?: RepositoryRequestOptions): Promise<User[]>;
}

export interface PostsRepository {
  getPostsByUser(
    userId: number,
    options?: RepositoryRequestOptions,
  ): Promise<Post[]>;
}
