import React, { useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

function MyCollectionListComponent({
  postList,
  isLoading,
  deleteFromDB,
  paginate,
}) {
  const [singleCol, setSingleCol] = useState({});
  const [singleShow, setSingleShow] = useState(false);

  const clickHandler = (index) => {
    deleteFromDB(index);
    paginate(1);
  };

  if (isLoading) {
    return <Wrapper className="section-center">Loading .....</Wrapper>;
  }
  if (singleShow) {
    return (
      <Wrapper className="section-center">
        <article>
          <h3>Name of the Collection : {singleCol.collectionName}</h3>
          <h5>Type: {singleCol.type}</h5>
          <p>Created at : {singleCol.created_at}</p>
          {singleCol.repo.map((repo, index) => {
            return (
              <li key={index}>
                {repo.name}
                {repo.url}
              </li>
            );
          })}
          <button
            className="btn btn-primary btn-details"
            onClick={() => setSingleShow(false)}
          >
            Go Back
          </button>
        </article>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className="section-center">
        {postList.length ? (
          ""
        ) : (
          <h3>No Collection matches your Search/Filter</h3>
        )}
        {postList.map((obj, index) => {
          return (
            <article key={index}>
              <h3>Name of the Collection : {obj.collectionName}</h3>
              <h4>Total Repo : {obj.repo.length}</h4>
              <h5>Type: {obj.type}</h5>
              <p>Created at : {obj.created_at}</p>
              <div style={{ display: "flex" }}>
                <button
                  className="btn btn-primary btn-details"
                  onClick={() => {
                    setSingleCol(obj);
                    setSingleShow(true);
                  }}
                  style={{ color: "green", margin: "0.3rem" }}
                >
                  View
                </button>
                <Link
                  to={`/${obj.index}/edit`}
                  className="btn btn-primary btn-details"
                  style={{ color: "green", margin: "0.3rem" }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => clickHandler(obj.index)}
                  className="btn btn-primary btn-details"
                  style={{ color: "red", margin: "0.3rem" }}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;
export default MyCollectionListComponent;
