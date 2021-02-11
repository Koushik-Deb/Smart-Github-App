import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import SmartGitLogo from "../images/SmartGitLogo.png";

const Navbar = () => {
  const {
    isAuthenticated,

    logout,
    user,
  } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <Wrapper>
      <Link to={`/`}>
        <img
          src={SmartGitLogo}
          alt="LOGO"
          style={{
            justifyContent: "left",
            width: "60px",
            height: "60px",
          }}
        />
      </Link>
      {isUser && user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{ justifyContent: "flex-end" }}
        />
      )}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
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
        to={`/collectionlist`}
        className="btn btn-primary btn-details"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Collection List
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

      {/* <button className="btn btn-primary btn-details">Refresh</button>
      <button className="btn btn-primary btn-details">Refresh</button>
      <button className="btn btn-primary btn-details">Refresh</button> */}
      <button onClick={logout}>logout</button>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: flex;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    justify-content: flex-start;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
