import React from "react";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationTable = ({ totalPage, onChangePage, pageActive }) => {
  const items = [];
  const maxPagesToShow = 3;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, pageActive - halfMaxPagesToShow);
  let endPage = Math.min(totalPage, pageActive + halfMaxPagesToShow);

  if (pageActive <= halfMaxPagesToShow) {
    endPage = Math.min(totalPage, maxPagesToShow);
  } else if (pageActive + halfMaxPagesToShow >= totalPage) {
    startPage = Math.max(1, totalPage - maxPagesToShow + 1);
  }

  // Tambahkan tombol panah kiri
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => onChangePage(pageActive - 1)}
      disabled={pageActive === 1}
    >
      <FaArrowLeft />
    </Pagination.Prev>
  );

  // Tambahkan nomor halaman
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pageActive}
        onClick={() => onChangePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Tambahkan tombol panah kanan
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => onChangePage(pageActive + 1)}
      disabled={pageActive === totalPage}
    >
      <FaArrowRight />
    </Pagination.Next>
  );

  return <Pagination>{items}</Pagination>;
};

export default PaginationTable;
