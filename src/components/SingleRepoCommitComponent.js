import React from "react";
import styled from "styled-components";
import loadingImage from "../images/preloader.gif";
import { Error } from "../pages";

function SingleRepoCommitComponent({ loading, error, errorMsg, history }) {
  if (loading) {
    return (
      <main>
        <img className="loading-img" src={loadingImage} alt="spinner" />;
      </main>
    );
  }
  if (error) {
    return <Error />;
  }
  if (history.length) {
    return (
      <div className="section">
        <Wrapper className="section-center">
          <h1 style={{ justifyContent: "center", alignItems: "center" }}>
            Git Commit Status
          </h1>
        </Wrapper>
        <Wrapper className="section-center">
          {history.map((item, index) => {
            return (
              <article key={index}>
                <h1>{item.commit.committer.name}</h1>
                <p>{item.commit.committer.date.slice(0, 10)}</p>
              </article>
            );
          })}
        </Wrapper>
      </div>
    );
  }
  return <h2>No commits found</h2>;
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

export default SingleRepoCommitComponent;
