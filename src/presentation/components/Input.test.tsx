import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input, Textarea } from './Input';

describe('Input', () => {
  it('connects the label, control and error', () => {
    render(<Input id="title" label="Title" error="Enter a title." />);

    const input = screen.getByLabelText('Title');
    const error = screen.getByText('Enter a title.');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'title-error');
    expect(error).toHaveAttribute('id', 'title-error');
  });

  it('renders a plain input without error attributes', () => {
    render(<Input id="name" label="Name" />);

    const input = screen.getByLabelText('Name');

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('marks a required field and keeps the marker out of the label text', () => {
    render(<Input id="title" label="Title" required />);

    const input = screen.getByLabelText('Title');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders an accessible textarea with the same contract', () => {
    render(
      <Textarea id="body" label="Body" error="Add a body." />,
    );

    const textarea = screen.getByLabelText('Body');

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'body-error');
    expect(screen.getByText('Add a body.')).toHaveAttribute(
      'id',
      'body-error',
    );
  });
});
