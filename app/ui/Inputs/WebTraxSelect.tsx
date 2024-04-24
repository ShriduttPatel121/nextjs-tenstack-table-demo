import { ReactNode, useMemo, useRef, useState } from 'react';
import Portal from '../Portal/Portal';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface WebTraxSelectProps {
  options: { key: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  iconPosition?: 'prefix' | 'suffix';
  name: string;
}

export default function WebtraxSelect({
  options,
  value,
  onChange,
  name,
}: WebTraxSelectProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleRemoveFocus = () => {
    setShowMenu(false);
  };
  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleSelect = (value: string) => {
    onChange(value);
  };
  return (
    <>
      <div className="relative inline-block text-left">
        <div
          onClick={handleShowMenu}
          className="selection:border-1 input input-bordered flex items-center selection:border-slate-500"
          tabIndex={-1}
        >
          <span className="text-sm">{value}</span>
          <input
            style={{ display: 'none' }}
            value={value}
            name={name}
            readOnly
          />
          <ChevronDownIcon className="ml-auto h-5 w-5" />
        </div>
        <div
          className={clsx({
            'duration-250 absolute right-0 z-[500] mt-2 w-full origin-top-right scale-100 transform rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition ease-out focus:outline-none':
              true,
            'scale-100 transform opacity-100': showMenu,
          })}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onClick={handleRemoveFocus}
        >
          <div className="w-full py-1" role="none">
            {options.map((option) => (
              <a
                key={option.key}
                role="menuitem"
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-slate-300"
                tabIndex={-1}
                onClick={() => handleSelect(option.value)}
              >
                {option.key}
              </a>
            ))}
          </div>
        </div>
        {showMenu && (
          <div
            onClick={handleRemoveFocus}
            className="fixed left-0 top-0 z-[350] h-screen w-full bg-transparent"
          ></div>
        )}
      </div>
    </>
  );
}
