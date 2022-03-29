import React from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import theme from "../../../theme";

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
            // variant="outlined"
            // sx={{
            //   "& .MuiPaginationItem-outlined": {
            //     color: "white",
            //     "&.Mui-selected": {
            //       bgcolor: "#837873",
            //     },
            //   },
            // }}
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
