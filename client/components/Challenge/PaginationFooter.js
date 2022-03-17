import React from "react";

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




  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} 
          className={number === currentPage ? "selected" : "nonselected"}
          >
            <a
              onClick={() => {
                paginate(number);
              }}
              // href={
              //   path === "a-z"
              //     ? "#/products/sorted/a-z"
              //     : path === "low-high"
              //     ? "#/products/sorted/price/low-high"
              //     : path === "high-low"
              //     ? "#/products/sorted/price/high-low"
              //     : "#/"
              // }
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
