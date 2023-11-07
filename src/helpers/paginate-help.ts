export const paginateData = <T>(
  currentPage: number,
  itemsPerPage: number,
  data: T[]
): { currentItems: T[]; totalPages: number } => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { currentItems, totalPages };
};

export {};
