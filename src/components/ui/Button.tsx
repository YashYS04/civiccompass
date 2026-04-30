import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'icon';
  asChild?: boolean;
}

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
