'use client';
import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  iconPosition: 'prefix' | 'middle' | 'suffix';
  children?: ReactNode;
  icon: ReactNode;
}

export default function IconButton({
  iconPosition,
  children,
  icon,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={clsx(
        'btn flex items-center rounded-lg',
        className,
      )}
      {...rest}
    >
      {(iconPosition === 'prefix' || iconPosition === 'middle') && icon}
      {children}
      {iconPosition === 'suffix' && icon}
    </button>
  );
}
