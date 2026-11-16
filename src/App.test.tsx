import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the product heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /users & posts/i }),
    ).toBeInTheDocument();
  });

  it('points the reader at the approved preview', () => {
    render(<App />);

    expect(screen.getByText('design/preview.html')).toBeInTheDocument();
  });
});
