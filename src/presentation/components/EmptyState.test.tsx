import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the default no-selection copy and an action', () => {
    render(
      <EmptyState
        action={<Button variant="secondary">Find someone</Button>}
      />,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Start with a person.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Choose someone from the directory to read their posts.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Find someone' }),
    ).toBeInTheDocument();
  });
});
