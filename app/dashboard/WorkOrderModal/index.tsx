'use client';

import { HTMLAttributes, useRef } from 'react';

interface WorkOrderModalProps extends HTMLAttributes<HTMLDialogElement> {
  mode: 'Add' | 'Edit';
  customerName: string;
}

export default function WorkOrderModal({ mode, customerName, ...rest }: WorkOrderModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseDialog = () => {
    dialogRef.current!.close();
  }

  return (
    <dialog {...rest} id="my_modal_4" className="modal" ref={dialogRef}>
      <div className="modal-box w-11/12 max-w-7xl rounded-none">
        <div className="flex p-2">
          <div className="">
              <p className='font-bold text-lg'>{mode} Work Order</p>
              <p className='fot'>For {customerName}</p>
          </div>
        </div>
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Click the button below to close</p>
        <div className="modal-action">
          <button className="btn" onClick={handleCloseDialog}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
