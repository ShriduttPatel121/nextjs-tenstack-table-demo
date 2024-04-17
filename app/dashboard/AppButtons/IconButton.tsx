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
        'btn flex h-14 w-48 items-center rounded-lg p-4',
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
