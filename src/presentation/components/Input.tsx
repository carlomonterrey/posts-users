import type { ComponentPropsWithRef } from 'react';
import { cx } from '../utils/cx';
import styles from './Input.module.css';

interface FieldBaseProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly required?: boolean;
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
    <p id={`${id}-error`} className={styles.error}>
      {error}
    </p>
  );
}

export function Input({
  id,
  label,
  error,
  required,
  className,
  ...props
}: InputProps) {
  return (
    <div className={styles.field}>
      <label
        className={cx(styles.label, required ? styles.required : undefined)}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        required={required}
        className={cx(
          styles.control,
          styles.input,
          error ? styles.invalid : undefined,
          className,
        )}
        aria-invalid={error ? 'true' : 'false'}
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
  required,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={styles.field}>
      <label
        className={cx(styles.label, required ? styles.required : undefined)}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        {...props}
        id={id}
        required={required}
        className={cx(
          styles.control,
          styles.textarea,
          error ? styles.invalid : undefined,
          className,
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}
