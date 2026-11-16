import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getInitials } from '../utils/initials';
import { Avatar } from './Avatar';

describe('getInitials', () => {
  it('uses the first and last meaningful name parts', () => {
    expect(getInitials('Leanne Graham')).toBe('LG');
    expect(getInitials('Mrs. Dennis Schulist')).toBe('DS');
    expect(getInitials('Nicholas Runolfsdottir V')).toBe('NR');
  });

  it('handles single and empty names', () => {
    expect(getInitials('Cher')).toBe('CH');
    expect(getInitials('   ')).toBe('?');
  });
});

describe('Avatar', () => {
  it('renders decorative initials', () => {
    render(<Avatar name="Leanne Graham" />);

    const avatar = screen.getByText('LG');

    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatar).toHaveAttribute('data-size', 'sm');
  });

  it('renders the inverse tone in the selected row', () => {
    render(<Avatar name="Leanne Graham" tone="inverse" size="lg" />);

    const avatar = screen.getByText('LG');

    expect(avatar).toHaveAttribute('data-tone', 'inverse');
    expect(avatar).toHaveAttribute('data-size', 'lg');
  });
});
