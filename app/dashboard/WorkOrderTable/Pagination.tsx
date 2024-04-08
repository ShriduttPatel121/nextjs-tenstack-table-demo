import React from 'react';

interface WorkOrderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => void;
  activeClass?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, activeClass }: WorkOrderPaginationProps) => {
  // Calculate start and end buttons based on current page and total pages
  let startPage = currentPage - 3;
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
        <button className={`join-item btn border-slate-300 bg-slate-100 text-slate-700 font-semibold ${1 === currentPage ? activeClass : ''}`} key="first" onClick={() => onPageChange(0)}>1</button>,
        <span className='join-item btn border-slate-300 bg-slate-100 text-slate-700 font-semibold' key="ellipsis1">...</span>
      );
    }

    pages.forEach(page => {
      console.log("PAGE: ", page);
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page - 1)}
          className={`join-item btn border-slate-300 bg-slate-100 text-slate-700 font-semibold ${page === currentPage ? activeClass : ''}`}
        >
          {page}
        </button>
      );
    });

    if (endPage < totalPages) {
      buttons.push(
        <button className='join-item btn border-slate-300 bg-slate-100 text-slate-700 font-semibold' key="ellipsis2">...</button >,
        <button className={`join-item btn border-slate-300 bg-slate-100 text-slate-700 font-semibold ${totalPages === currentPage ? activeClass : ''}`} key="last" onClick={() => onPageChange(totalPages - 1)}>{totalPages}</button>
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
