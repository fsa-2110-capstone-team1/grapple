import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationFooter = ({
  totalPosts,
  challengesPerPage,
  paginate,
  currentPage,
  setCurrentPage,

  // path,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / challengesPerPage); i++) {
    pageNumbers.push(i);
  }

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  return (
    <nav>
      <ul className="pagination">
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            sx={{
              "& .MuiPaginationItem-outlined": {
                color: "white",
                "&.Mui-selected": {
                  bgcolor: "#837873",
                },
              },
            }}
            count={pageNumbers.length}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </ul>
    </nav>
  );
};

export default PaginationFooter;
