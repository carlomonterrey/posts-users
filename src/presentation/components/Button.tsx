import type { ComponentPropsWithRef } from 'react';
import { cx } from '../utils/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  readonly variant?: ButtonVariant;
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-variant={variant}
      className={cx(styles.button, styles[variant], className)}
    />
  );
}
