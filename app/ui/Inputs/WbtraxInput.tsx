import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

interface WebtraxInputProps extends HTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: 'prefix' | 'suffix';
  value?: string;
}

export default function WebtraxInput({
  icon,
  iconPosition,
  className,
  value,
  ...rest
}: WebtraxInputProps) {
  return icon && iconPosition ? (
    <label className="input input-bordered flex items-center gap-2 h-full">
      {iconPosition === 'prefix' && icon}
      <input
          style={{ outline: 'none', borderWidth: '0' }}
          className={clsx("focus:border-gray-300 focus:ring-0", className)}
          value={value}
        {...rest}
      />
      {iconPosition === 'suffix' && icon}
    </label>
  ) : (
    <input type="text" className='input' {...rest} />
  );
}
