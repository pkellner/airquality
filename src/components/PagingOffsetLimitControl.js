import React from "react";

const PagingOffsetLimitControl = ({
  lastPage,
  currentPage,
  setCurrentPage,
}) => {
  return (



    <ul className="pagination">
      <li className="page-item">
          <a
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}
          className="page-link"
          href="#"
          aria-label="First"
        >
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </a>
      </li>
      
      <li className="page-item">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className="page-link"
          href="#"
          aria-label="Previous"
        >
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </a>
      </li>

      <li className="page-item active">
        <span className="page-link">{currentPage}</span>
      </li>

      <li className="page-item">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < lastPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className="page-link"
          href="#"
          aria-label="Next"
        >
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      </li>

      <li className="page-item">
        <a
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(lastPage);
          }}
          className="page-link"
          href="#"
          aria-label="Last"
        >
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  );
};

export default PagingOffsetLimitControl;
