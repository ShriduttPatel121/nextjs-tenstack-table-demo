'use client';
import { HTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    iconPosition: 'prefix' | 'middle' | 'suffix';
    children?: ReactNode;
    icon: ReactNode;
}

export default function IconButton({ iconPosition, children, icon, ...rest }: IconButtonProps) {
    return (
        <button {...rest}>
            {(iconPosition === ('prefix') || (iconPosition === 'middle')) && icon}
            {children}
            {iconPosition === 'suffix' && icon}
        </button>
    )
}