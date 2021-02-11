import React from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";
import InformationCard from "./InformationCard";
const User = () => {
  return (
    <section className="secion">
      <Wrapper className="section-center">
        <CollectionCard></CollectionCard>
        <InformationCard></InformationCard>
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

export default User;
