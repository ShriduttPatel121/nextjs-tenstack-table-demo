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
  anchorElement?: HTMLElement | null;
}

export default function WebtraxSelect({
  options,
  value,
  onChange,
  name,
  anchorElement,
}: WebTraxSelectProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleRemoveFocus = () => {
    setShowMenu(false);
  };
  const handleShowMenu = () => {
    setShowMenu(true);console.log("anchorElement: ", anchorElement?.clientHeight);

  }

  // const randomId = useMemo(() => { return Math.floor(Math.random() *1000 )}, [])
  const handleSelect = (value: string) => {
    onChange(value);
  };
  return (
    <>
      <div className="relative inline-block text-left">
        <div
          onClick={handleShowMenu}
          className="input input-bordered flex items-center"
          style={{ outline: 'none', borderWidth: '0' }}
        >
          <span className="text-sm">{value}</span>
          <input style={{ display: 'none' }} value={value} name={name} readOnly />
          <ChevronDownIcon className="ml-auto h-6 w-6" />
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
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
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
        {showMenu ? (
          <>
            {anchorElement?.clientHeight ? (
              <div
                onClick={() => {
                  handleRemoveFocus();
                  console.log('HHHHHHH');
                }}
                className="fixed left-0 top-0 z-[150] h-screen w-full bg-slate-300"
              ></div>
            ) : (
              <Portal>
                <div
                  onClick={() => {
                    handleRemoveFocus();
                    console.log('HHHHHHH');
                  }}
                  className="fixed left-0 top-0 z-[150] h-screen w-full bg-slate-300"
                ></div>
              </Portal>
            )}
          </>
        ) : null}
        {/* {showMenu && (
          <Portal>
            <div
              onClick={() => {
                handleRemoveFocus();
                console.log('HHHHHHH');
              }}
              className="fixed left-0 top-0 z-[150] h-screen w-full bg-slate-300"
            ></div>
          </Portal>
        )} */}
      </div>
    </>
  );
}
