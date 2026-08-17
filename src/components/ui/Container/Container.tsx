import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  const classes = ['container', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
