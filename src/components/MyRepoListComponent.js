import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GithubContext } from "../context/context";

function MyRepoListComponent() {
  const { repos, firebasedata } = useContext(GithubContext);

  const checker = (repo) => {
    var flag = 0;
    for (let key in firebasedata) {
      firebasedata[key].forEach((obj) => {
        if (obj.repo) {
          for (var ind = 0; ind < obj.repo.length; ind++) {
            if (obj.repo[ind].id === repo.id) {
              flag = 1;
              break;
            }
          }
        }
      });
    }
    if (flag === 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="section">
      <Wrapper className="section-center">
        <h2 style={{ justifyContent: "center", alignItems: "center" }}>
          Public Repository Status
        </h2>
      </Wrapper>
      <Wrapper className="section-center">
        {repos.map((repo, index) => {
          return (
            <article key={index}>
              {/* <li> */}
              <h4>{repo.name}</h4>
              <Link
                to={`/${repo.full_name}/commit`}
                className="btn btn-primary btn-details"
              >
                view commit
              </Link>

              <p> {checker(repo) ? "Occupied" : "Not Occupied"}</p>
              {/* </li> */}
            </article>
          );
        })}
      </Wrapper>
    </div>
  );
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
export default MyRepoListComponent;
