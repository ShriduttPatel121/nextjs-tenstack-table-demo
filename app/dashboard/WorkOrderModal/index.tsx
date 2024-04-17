'use client';
import { HTMLAttributes, useRef } from 'react';
import IconButton from '@/app/dashboard/AppButtons/IconButton';

import { XMarkIcon, ChevronDownIcon, PaperClipIcon, UserGroupIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

interface WorkOrderModalProps extends HTMLAttributes<HTMLDialogElement> {
  mode: 'Add' | 'Edit';
  customerName: string;
}

export default function WorkOrderModal({
  mode,
  customerName,
  ...rest
}: WorkOrderModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseDialog = () => {
    dialogRef.current!.close();
  };

  return (
    <dialog {...rest} id="work-order-modal" className="modal" ref={dialogRef}>
      <div className="modal-box w-11/12 max-w-7xl rounded-none p-0">
        
        <div className="flex items-center justify-between p-4 border-b-1 border-gray-300 drop-shadow-sm">
          <div>
            <p className="text-lg font-semibold">{mode} Work Order</p>
            <p className="text-sm">For {customerName}</p>
          </div>
          <div>
            <button onClick={handleCloseDialog} className="btn btn-circle bg-transparent hover:bg-transparent border-none">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex">
          
          <div className='grow'>
            <div className=''>

            </div>
          </div>
          
          <div className="flex flex-col gap-4 max-w-5 p-2 px-4 border-l-1 border-gray-300">
            <button className='btn btn-square bg-transparent hover:bg-transparent p-2 border-none'>
              <PaperClipIcon className='w-6 h-6 text-gray-600' />
            </button>
            <button className='btn btn-square bg-transparent hover:bg-transparent p-2 border-none'>
              <UserGroupIcon className='w-6 h-6 text-gray-600' />
            </button>
            <button className='btn btn-square bg-transparent hover:bg-transparent p-2 border-none'>
              <ChatBubbleBottomCenterIcon className='w-6 h-6 text-gray-600' />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between border-t-1 border-gray-300 p-4">
          <button onClick={handleCloseDialog} className='btn bg-white hover:bg-white text-gray-600 p-3 h-12 rounded-lg border-1 border-gray-300 hover:border-gray-300'>
            Cancel
          </button>
          <div className='flex gap-4'>
              <button className='btn bg-sky-200 hover:bg-sky-200 text-sky-700 p-2'>Save As Template</button>
              <button className='btn bg-sky-700 hover:bg-sky-700 text-white flex items-center px-2'>
                <span className='p-2 px-3'>Save</span>
                <div className='border-0 w-[1px] bg-white h-full' />
                <span><ChevronDownIcon className='w-5 h-4 mt-0.5' /></span>
              </button>
          </div>
        </div>
      </div>
      {/* below form is for closing modal when user clicks in backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
