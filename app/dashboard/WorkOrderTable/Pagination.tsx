import React from 'react';

import { Table } from "@tanstack/react-table";

import { TWorkOrder } from '@/data/workOrderUtils';

interface WorkOrderPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: Function;
    table: Table<TWorkOrder>
}

const Pagination = ({ currentPage, totalPages, onPageChange }: WorkOrderPaginationProps) => {
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
        <button key="first" onClick={() => onPageChange(1)}>1</button>,
        <span key="ellipsis1">...</span>
      );
    }

    pages.forEach(page => {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      );
    });

    if (endPage < totalPages) {
      buttons.push(
        <span key="ellipsis2">...</span>,
        <button key="last" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
