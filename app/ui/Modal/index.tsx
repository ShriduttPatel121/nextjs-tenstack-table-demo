'use client';
import { HTMLAttributes, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backDropZIndex?: number;
}
export default function Modal({
  isOpen,
  onClose,
  children,
  backDropZIndex = 250,
}: ModalProps) {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <>
        <div
          className={`fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none transition-opacity ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          style={{ zIndex: backDropZIndex }}
        >
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div
            style={{ zIndex: backDropZIndex + 15 }}
            className="relative w-full lg:w-10/12 bg-white opacity-100 shadow-lg"
          >
            {children}
          </div>
        </div>
      </>,
      window?.document.body,
    );
  }
}
