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
    render(<Avatar id={1} name="Leanne Graham" />);

    const avatar = screen.getByText('LG');

    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatar).toHaveAttribute('data-size', 'sm');
    expect(avatar).toHaveAttribute('data-avatar-index', '1');
  });

  it('picks a palette color from the user id', () => {
    render(<Avatar id={1} name="Leanne Graham" />);

    const avatar = screen.getByText('LG');

    expect(avatar.getAttribute('style')).toContain(
      'var(--color-avatar-2)',
    );
  });

  it('keeps the palette while selected and adds the ring', () => {
    render(
      <Avatar id={4} name="Patricia Lebsack" size="lg" selected />,
    );

    const avatar = screen.getByText('PL');

    expect(avatar).toHaveAttribute('data-size', 'lg');
    expect(avatar).toHaveAttribute('data-selected', 'true');
    expect(avatar.getAttribute('style')).toContain(
      'var(--color-avatar-1)',
    );
  });
});
