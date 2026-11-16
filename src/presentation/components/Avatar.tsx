import { cx } from '../utils/cx';
import { getInitials } from '../utils/initials';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'lg';
export type AvatarTone = 'default' | 'inverse';

export interface AvatarProps {
  readonly name: string;
  readonly size?: AvatarSize;
  readonly tone?: AvatarTone;
  readonly className?: string;
}

export function Avatar({
  name,
  size = 'sm',
  tone = 'default',
  className,
}: AvatarProps) {
  return (
    <span
      className={cx(
        styles.avatar,
        styles[size],
        tone === 'inverse' ? styles.inverse : undefined,
        className,
      )}
      aria-hidden="true"
      data-size={size}
      data-tone={tone}
    >
      {getInitials(name)}
    </span>
  );
}
