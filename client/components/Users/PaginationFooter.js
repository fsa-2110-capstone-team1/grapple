import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationFooter = ({
  totalPosts,
  challengesPerPage,
  paginate,
  currentPage,
  // path,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / challengesPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers)

  return (
    <nav>
      <ul className="pagination">
        <Stack spacing={2}>
          <Pagination count={pageNumbers.length}  
           onClick={() => {console.log(page);}} 
           color="primary" />
        </Stack>




        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? "selected" : "nonselected"}
          >
            <a
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationFooter;

