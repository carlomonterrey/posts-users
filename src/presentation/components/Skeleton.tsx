import type { CSSProperties } from 'react';
import { cx } from '../utils/cx';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'line' | 'title' | 'avatar';

export interface SkeletonProps {
  readonly variant?: SkeletonVariant;
  readonly width?: string;
  readonly className?: string;
}

export function Skeleton({
  variant = 'line',
  width,
  className,
}: SkeletonProps) {
  const style: CSSProperties | undefined = width ? { width } : undefined;

  return (
    <span
      className={cx(styles.skeleton, styles[variant], className)}
      style={style}
      aria-hidden="true"
    />
  );
}

export interface SkeletonListProps {
  readonly layout?: 'person' | 'post';
  readonly rows?: number;
}

export function SkeletonList({
  layout = 'person',
  rows = 6,
}: SkeletonListProps) {
  if (layout === 'post') {
    return (
      <div className={styles.list} aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <div className={styles.post} key={index}>
            <Skeleton variant="title" width="70%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="56%" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.list} aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div className={styles.person} key={index}>
          <Skeleton variant="avatar" />
          <span className={styles.lines}>
            <Skeleton width="120px" />
            <Skeleton width="80px" />
          </span>
        </div>
      ))}
    </div>
  );
}
