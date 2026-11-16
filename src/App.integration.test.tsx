import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import type { Post, User } from './domain/entities';
import type {
  PostsRepository,
  UsersRepository,
} from './infrastructure/repositories/types';

const users: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette' },
];

const remotePost: Post = {
  id: 1,
  userId: 1,
  title: 'A remote post',
  body: 'Loaded from the repository.',
};

const usersRepository: UsersRepository = {
  getUsers: async () => users,
};

const postsRepository: PostsRepository = {
  getPostsByUser: async (userId) => (userId === 1 ? [remotePost] : []),
};

function renderApp() {
  render(
    <App
      usersRepository={usersRepository}
      postsRepository={postsRepository}
    />,
  );
}

describe('App integration', () => {
  it('filters the directory by name', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      await screen.findByRole('button', { name: /leanne graham/i }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByRole('searchbox', { name: 'Find someone' }),
      'ervin',
    );

    expect(
      screen.queryByRole('button', { name: /leanne graham/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /ervin howell/i }),
    ).toBeInTheDocument();
  });

  it('selects a person, publishes a post, and shows it in the feed', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      await screen.findByRole('button', { name: /leanne graham/i }),
    );

    expect(
      await screen.findByRole('heading', {
        level: 4,
        name: 'A remote post',
      }),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText('Title'), 'A local post');
    await user.type(
      screen.getByLabelText('Body'),
      'A body long enough',
    );
    await user.click(screen.getByRole('button', { name: 'Publish' }));

    expect(
      await screen.findByRole('heading', {
        level: 4,
        name: 'A local post',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('A body long enough')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('');
  });
});
