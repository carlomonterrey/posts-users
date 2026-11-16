import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  readonly title?: string;
  readonly description?: string;
  readonly action?: ReactNode;
}

export function EmptyState({
  title = 'Start with a person.',
  description = 'Choose someone from the directory to read their posts.',
  action,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
