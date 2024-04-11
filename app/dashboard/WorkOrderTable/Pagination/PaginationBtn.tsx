import { ButtonHTMLAttributes, ReactNode } from "react";

interface PaginationBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
    activeClass?: string;
    children: ReactNode;
}

export default function PaginationBtn({ isActive, children, activeClass, ...rest }: PaginationBtnProps) {
    return <button
        className={`join-item min-w-[52px] btn text-slate-700 font-semibold ${isActive ? activeClass : 'border-slate-300 bg-white'}`}
        {...rest}
    >
        {children}
    </button>
}