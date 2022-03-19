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