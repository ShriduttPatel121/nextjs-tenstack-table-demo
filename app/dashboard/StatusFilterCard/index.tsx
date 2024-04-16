import clsx from "clsx";
import React, { HTMLAttributes, ReactNode } from "react";

interface StatusFilterCardProp extends HTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    icon: ReactNode;
    iconContainerClass?: string;
    title: string;
    filterValue: string;
    

}

export default function StatusFilterCard({ isActive = false, icon, title, filterValue, iconContainerClass, ...rest }: StatusFilterCardProp) {
    return <button className={clsx("btn hover:bg-white h-20 flex p-4 basis bg-white rounded-lg basis-72 shrink items-center justify-start", {
        "ring-2" : isActive
    })} { ...rest }>
        <div className={iconContainerClass}>
            {icon}
        </div>
        <div className="flex flex-col ml-4 gap-3">
            <span className="text-sm text-gray-600">{title}</span>
            <span className="text-lg font-bold leading-3 text-left">{filterValue}</span>
        </div>
    </button>
}