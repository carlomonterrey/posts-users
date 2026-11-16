import { cx } from '../utils/cx';
import { Button } from './Button';
import styles from './ErrorState.module.css';

export interface ErrorStateProps {
  readonly title: string;
  readonly description?: string;
  readonly onRetry?: () => void;
  readonly retryLabel?: string;
  readonly compact?: boolean;
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = 'Try again',
  compact = false,
}: ErrorStateProps) {
  return (
    <div
      className={cx(styles.error, compact ? styles.compact : undefined)}
      role="alert"
    >
      <p className={styles.title}>{title}</p>
      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      {onRetry ? (
        <div className={styles.action}>
          <Button variant="text" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
