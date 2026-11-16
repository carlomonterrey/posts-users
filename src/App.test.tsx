import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type {
  PostsRepository,
  UsersRepository,
} from './infrastructure/repositories/types';
import { App } from './App';

const usersRepository: UsersRepository = {
  getUsers: async () => [
    { id: 1, name: 'Leanne Graham', username: 'Bret' },
  ],
};

const postsRepository: PostsRepository = {
  getPostsByUser: async () => [],
};

describe('App', () => {
  it('renders the page shell and loads the directory', async () => {
    render(
      <App
        usersRepository={usersRepository}
        postsRepository={postsRepository}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /users & posts/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('searchbox', { name: 'Find someone' }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('button', { name: /leanne graham/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Start with a person.',
      }),
    ).toBeInTheDocument();
  });
});
