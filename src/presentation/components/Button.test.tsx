import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a primary button by default and handles clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Publish</Button>);

    const button = screen.getByRole('button', { name: 'Publish' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports secondary and text variants', () => {
    const { rerender } = render(
      <Button variant="secondary">Action</Button>,
    );

    expect(screen.getByRole('button', { name: 'Action' })).toHaveAttribute(
      'data-variant',
      'secondary',
    );

    rerender(<Button variant="text">Action</Button>);

    expect(screen.getByRole('button', { name: 'Action' })).toHaveAttribute(
      'data-variant',
      'text',
    );
  });

  it('respects an explicit submit type and disabled state', () => {
    render(
      <Button type="submit" disabled>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });
});
