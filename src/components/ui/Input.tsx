import React from 'react';
import styles from './Input.module.css';

/** Props for the Input component */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input — Reusable, accessible text input primitive.
 * Uses CSS Modules for scoped styling and forwardRef for DOM access.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${className || ''}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
