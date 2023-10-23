import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ListPagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbersToShow = 10;
  const itemsPerPage = 1;
  const maxPagesToSkip = 10;

  const totalItems = itemsPerPage * totalPages;
  let startPage = Math.max(
    1,
    currentPage > maxPagesToSkip ? currentPage - maxPagesToSkip : 1
  );
  let endPage = Math.min(
    totalPages,
    startPage + maxPageNumbersToShow - 1
  );

  if (currentPage > endPage) {
    const pagesToSkip = Math.floor(currentPage / maxPagesToSkip) * maxPagesToSkip;
    startPage = pagesToSkip + 1;
    endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  }

  const getPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Flex mt={5} justifyContent="center" alignItems="center">
      {currentPage > 1 && (
        <Button
          variant="outline"
          leftIcon={<FaArrowLeft />}
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}
      {getPageNumbers().map((number) => (
        <Button
          key={number}
          variant="outline"
          colorScheme={currentPage === number ? "green" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          variant="outline"
          rightIcon={<FaArrowRight />}
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </Flex>
  );
};

export default ListPagination;
