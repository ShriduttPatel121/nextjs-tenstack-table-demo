import React from 'react';

import PaginationBtn from '@/app/dashboard/WorkOrderTable/Pagination/PaginationBtn';

interface WorkOrderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => void;
  activeClass?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, activeClass }: WorkOrderPaginationProps) => {
  // Calculate start and end buttons based on current page and total pages
  let startPage =    - 3;
  let endPage = currentPage + 3;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, 7);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 6);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const renderPaginationButtons = () => {
    const buttons = [];

    if (startPage > 1) {
      buttons.push(
        <PaginationBtn activeClass={activeClass} isActive={0 === currentPage} key="first" onClick={() => onPageChange(0)}>1</PaginationBtn>,
        <PaginationBtn isActive={false} key="ellipsis1">...</PaginationBtn>
      );
    }

    pages.forEach(page => {
      buttons.push(
        <PaginationBtn
          key={page}
          onClick={() => onPageChange(page - 1)}
          isActive={(page - 1) === currentPage}
          activeClass={activeClass}
        >
          {page}
        </PaginationBtn>
      );
    });

    if (endPage < totalPages) {
      buttons.push(
        <PaginationBtn isActive={false} key="ellipsis2">...</PaginationBtn >,
        <PaginationBtn 
          isActive={(totalPages - 1) === currentPage} 
          activeClass={activeClass} 
          key="last" 
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages}
        </PaginationBtn>
      );
    }

    return buttons;
  };

  return (
    <>
      {renderPaginationButtons()}
    </>
  );
};

export default Pagination;
