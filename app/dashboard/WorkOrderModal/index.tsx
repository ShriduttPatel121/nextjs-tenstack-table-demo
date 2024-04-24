'use client';
import { HTMLAttributes, useRef, useState } from 'react';
import IconButton from '@/app/ui/AppButtons/IconButton';
import WebtraxInput from '@/app/ui/Inputs/WbtraxInput';
import WebtraxSelect from '@/app/ui/Inputs/WebTraxSelect';
import Modal from '@/app/ui/Modal';

import { XMarkIcon, ChevronDownIcon, PaperClipIcon, UserGroupIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

type SelectOptionType = { key: string, value: string };

const WorkOrderOptions: SelectOptionType[] = [
  { key: 'Cleaning', value: 'CLEANING' },
  { key: 'Sweeping', value: 'SWEEPING' }
];

const TermsOptions: SelectOptionType[] = [
  { key: 'Yes', value: 'YES' },
  { key: 'No', value: 'NO' }
]

interface WorkOrderModalProps extends HTMLAttributes<HTMLDivElement> {
  mode: 'Add' | 'Edit';
  customerName: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function WorkOrderModal({
  mode,
  customerName,
  onClose,
  ...rest
}: WorkOrderModalProps) {

  // const dialogRef = useRef<HTMLDialogElement>(null);
  const [workOrderType, setWorkOrderType] = useState<string>('');
  const [termValue, setTermValue] = useState<string>('');

  const handleCloseDialog = () => {
    // dialogRef.current!.close();
  };

  return (
    <Modal onClose={onClose} {...rest} id="work-order-modal" >
      <div className="w-full rounded-none p-0">
        
        <div className="flex items-center justify-between p-4 border-b-1 border-gray-300 drop-shadow-sm">
          <div>
            <p className="text-lg font-semibold">{mode} Work Order</p>
            <p className="text-sm text-gray-600">For {customerName}</p>
          </div>
          <div>
            <button onClick={onClose} className="btn btn-circle bg-transparent hover:bg-transparent border-none">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex">
          
          <div className='grow'>
            <div className='bg-gray-100 pb-2'>
              <div className="border-b-gray-300 drop-shadow-sm p-4 border-2">
                <h1 className='font-bold text-lg'>Details</h1>
              </div>
              <div className='flex gap-1'>
                <div className='flex justify-between p-4 basis-5/12'>
                  <div className='flex w-full flex-col mt-3'>
                    <p className='text-sm font-normal text mb-2'>Work Order Description<span className='text-red-600'>*</span></p>
                    <textarea className='textarea' rows={1}></textarea>
                  </div>
                </div>
                <div className='flex justify-between p-4 basis-3/12 '>
                  <div className='flex w-full flex-col mt-3'>
                    <p className='text-sm font-normal text mb-2'>Type<span className='text-red-600'>*</span></p>
                    <WebtraxSelect  name="workOrderType" options={WorkOrderOptions} value={workOrderType} onChange={(val) => setWorkOrderType(val)} />
                  </div>
                </div>
                <div className='flex justify-between p-4 basis-3/12 '>
                  <div className='flex w-full flex-col mt-3'>
                    <p className='text-sm font-normal text mb-2'>Terms<span className='text-red-600'>*</span></p>
                    <WebtraxSelect  name="workOrderTerms" options={TermsOptions} value={termValue} onChange={(val) => setTermValue(val)} />
                  </div>
                </div>
              </div>
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
      {/* <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form> */}
    </Modal>
  );
}
