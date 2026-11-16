import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PostComposer } from './PostComposer';

function renderComposer() {
  const onPublish = vi.fn();

  render(<PostComposer userName="Leanne Graham" onPublish={onPublish} />);

  return { onPublish };
}

describe('PostComposer', () => {
  it('blocks an empty submission and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    const { onPublish } = renderComposer();

    await user.click(screen.getByRole('button', { name: 'Publish' }));

    expect(onPublish).not.toHaveBeenCalled();
    expect(
      screen.getByText('Enter a title of at least 3 characters.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Add a body of at least 10 characters.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveFocus();
    expect(screen.getByLabelText('Title')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('publishes trimmed values and resets the form', async () => {
    const user = userEvent.setup();
    const { onPublish } = renderComposer();

    await user.type(screen.getByLabelText('Title'), '  A local post  ');
    await user.type(
      screen.getByLabelText('Body'),
      '  A body long enough  ',
    );
    await user.click(screen.getByRole('button', { name: 'Publish' }));

    expect(onPublish).toHaveBeenCalledWith({
      title: 'A local post',
      body: 'A body long enough',
    });
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Body')).toHaveValue('');
    expect(screen.getByText('0 / 500')).toBeInTheDocument();
  });

  it('clears the draft and errors', async () => {
    const user = userEvent.setup();
    renderComposer();

    await user.click(screen.getByRole('button', { name: 'Publish' }));
    await user.type(screen.getByLabelText('Title'), 'A local post');
    await user.type(screen.getByLabelText('Body'), 'A body long enough');
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Body')).toHaveValue('');
    expect(
      screen.queryByText('Enter a title of at least 3 characters.'),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveFocus();
  });

  it('revalidates live after the first failed submission', async () => {
    const user = userEvent.setup();
    renderComposer();

    await user.click(screen.getByRole('button', { name: 'Publish' }));
    await user.type(screen.getByLabelText('Title'), 'A local post');

    expect(
      screen.queryByText('Enter a title of at least 3 characters.'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Add a body of at least 10 characters.'),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText('Body'), 'A body long enough');

    expect(
      screen.queryByText('Add a body of at least 10 characters.'),
    ).not.toBeInTheDocument();
  });
});
