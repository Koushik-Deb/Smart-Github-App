import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="section">
      <div className="section-center" style={{ display: "flex" }}>
        {pageNumbers.length ? (
          <p
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            Pages :
          </p>
        ) : (
          ""
        )}

        <ul className="pagination" style={{ display: "flex" }}>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className="btn btn-primary btn-details"
                style={{
                  color: "white",
                  margin: "0.1rem",
                  padding: "0.2rem",
                }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
