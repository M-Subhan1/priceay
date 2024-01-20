export const usePagination = ({
  page,
  total,
}: {
  page: number;
  total: number;
}) => {
  const pages: number[] = [1, page - 1, page, page + 2, total];

  return Array.from(new Set(pages))
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
};
