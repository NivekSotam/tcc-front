import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ListPagination: React.FC<ListPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPageNumbersToShow = 10;

  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

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
