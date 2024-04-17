import clsx from "clsx";
import { HTMLAttributes } from "react";

interface PageSectionProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}


export default function PageSection({ children, className, ...rest }: PageSectionProps) {
    return <section className={clsx("w-11/12 lg:max-w-screen-xl p-1", className)} {...rest}>{children}</section>
}