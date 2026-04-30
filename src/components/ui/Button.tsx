import React from 'react';
import styles from './Button.module.css';

/** Props for the Button component */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant — controls color and border style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size — 'icon' renders a square button for icon-only usage */
  size?: 'default' | 'icon';
}

/**
 * Button — Reusable, accessible button primitive.
 * Uses CSS Modules for scoped styling and forwardRef for DOM access.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      size === 'icon' ? styles.icon : '',
      className || ''
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classNames} {...props} />
    );
  }
);
Button.displayName = 'Button';
