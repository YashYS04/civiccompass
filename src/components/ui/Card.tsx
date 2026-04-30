import React from 'react';
import styles from './Card.module.css';

/**
 * Card — Container component for grouped content sections.
 * All sub-components use forwardRef for composability and CSS Modules for scoped styles.
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`${styles.card} ${className || ''}`} {...props} />
  )
);
Card.displayName = "Card";

/** CardHeader — Top section of a Card, typically contains title and description. */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`${styles.header} ${className || ''}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

/** CardTitle — Heading element inside CardHeader. */
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={`${styles.title} ${className || ''}`} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

/** CardDescription — Supplementary text inside CardHeader. */
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`${styles.description} ${className || ''}`} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

/** CardContent — Main body of the Card. */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`${styles.content} ${className || ''}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

/** CardFooter — Bottom section, typically contains actions. */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`${styles.footer} ${className || ''}`} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
