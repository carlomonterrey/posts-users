import type { ComponentPropsWithRef } from 'react';
import { cx } from '../utils/cx';
import styles from './Input.module.css';

interface FieldBaseProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
}

export type InputProps = FieldBaseProps & ComponentPropsWithRef<'input'>;
export type TextareaProps = FieldBaseProps &
  ComponentPropsWithRef<'textarea'>;

interface FieldErrorProps {
  readonly id: string;
  readonly error?: string;
}

function FieldError({ id, error }: FieldErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <p id={`${id}-error`} className={styles.error} role="alert">
      {error}
    </p>
  );
}

export function Input({
  id,
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        className={cx(
          styles.control,
          styles.input,
          error ? styles.invalid : undefined,
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function Textarea({
  id,
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        {...props}
        id={id}
        className={cx(
          styles.control,
          styles.textarea,
          error ? styles.invalid : undefined,
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}
