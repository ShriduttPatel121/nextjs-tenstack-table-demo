import { HTMLAttributes } from "react";

interface MainLayLoutProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}
export default function Main({ children, ...rest}: MainLayLoutProps) {
    return <main className="flex items-center justify-evenly min-h-screen flex-col max-h-screen overflow-y-auto bg-slate-100 p-6"
        {...rest}
    >
        {children}
    </main>
}