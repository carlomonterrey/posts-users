import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('announces the error and retries', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ErrorState
        title="These posts didn’t load."
        description="Check your connection and try again."
        onRetry={onRetry}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'These posts didn’t load.',
    );

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('supports a compact directory variant', () => {
    render(
      <ErrorState
        title="The directory didn’t load."
        description="Check your connection."
        compact
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The directory didn’t load.',
    );
    expect(
      screen.queryByRole('button', { name: 'Try again' }),
    ).not.toBeInTheDocument();
  });
});
