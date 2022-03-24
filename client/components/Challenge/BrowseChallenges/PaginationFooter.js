import React from "react";
import { Pagination, Stack, Typography } from "@mui/material";

const PaginationFooter = ({
  activePage,
  count,
  challengesPerPage,
  totalPages,
  setActivePage,
}) => {
  const handleChange = (event, value) => {
    setActivePage(value);
  };

  return (
    <nav>
      <ul className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={activePage}
            onChange={handleChange}
          />
        </Stack>
      </ul>
    </nav>
  );
};

export default PaginationFooter;
