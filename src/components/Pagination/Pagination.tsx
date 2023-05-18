import { Box, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  total: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  itemDescription: string;
}

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((item, index) => from + index + 1)
    .filter((page) => page > 0);
};

export const Pagination = ({
  total,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  itemDescription,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const lastPage = useMemo(
    () => Math.ceil(total / itemsPerPage),
    [total, itemsPerPage]
  );

  const previousPages = useMemo(
    () =>
      currentPage > 1
        ? generatePagesArray(currentPage - 2, currentPage - 1)
        : [],
    [currentPage]
  );

  const nextPages = useMemo(
    () =>
      currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + 1, lastPage))
        : [],
    [currentPage, lastPage]
  );

  return (
    <Stack
      direction="row"
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <Text fontWeight="bold">
          {total} {itemDescription}
        </Text>
      </Box>
      {totalPages > 1 && (
        <Stack direction="row" spacing="2">
          {currentPage > 2 && (
            <>
              <PaginationItem onPageChange={onPageChange} page={1} />
              {currentPage > 3 && (
                <Text color="gray.300" width="8" textAlign="center">
                  ...
                </Text>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => (
              <PaginationItem
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))}

          <PaginationItem
            onPageChange={onPageChange}
            page={currentPage}
            isCurrent
          />

          {nextPages.length > 0 &&
            nextPages.map((page) => (
              <PaginationItem
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))}

          {currentPage + 1 < lastPage && (
            <>
              {currentPage + 2 < lastPage && (
                <Text color="gray.300" width="8" textAlign="center">
                  ...
                </Text>
              )}
              <PaginationItem onPageChange={onPageChange} page={lastPage} />
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
};
