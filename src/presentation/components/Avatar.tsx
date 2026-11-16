import { cx } from '../utils/cx';
import { getInitials } from '../utils/initials';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'lg';

const AVATAR_COLORS = [
  'var(--color-avatar-1)',
  'var(--color-avatar-2)',
  'var(--color-avatar-3)',
  'var(--color-avatar-4)',
] as const;

export interface AvatarProps {
  readonly id: number;
  readonly name: string;
  readonly size?: AvatarSize;
  readonly selected?: boolean;
  readonly className?: string;
}

export function Avatar({
  id,
  name,
  size = 'sm',
  selected = false,
  className,
}: AvatarProps) {
  const color = AVATAR_COLORS[id % 4];

  return (
    <span
      className={cx(
        styles.avatar,
        styles[size],
        selected ? styles.selected : undefined,
        className,
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
      data-size={size}
      data-avatar-index={id % 4}
      data-selected={selected ? 'true' : undefined}
    >
      {getInitials(name)}
    </span>
  );
}
