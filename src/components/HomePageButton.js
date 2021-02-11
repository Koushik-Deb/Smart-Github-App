import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const HomePageButton = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Link
          to={`/createcollection`}
          className="btn btn-primary btn-details"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Create Collection
        </Link>
        <Link
          to={`/myrepolist`}
          className="btn btn-primary btn-details"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          My Repos
        </Link>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default HomePageButton;
