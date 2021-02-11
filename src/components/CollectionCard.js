import React, { useContext } from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";

import { BsFillCollectionPlayFill } from "react-icons/bs";
import { MdBusiness, MdLocationOn, MdLink } from "react-icons/md";
const CollectionCard = () => {
  const { githubUser, firebasedata } = useContext(GithubContext);

  const {
    avatar_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;
  let count = 0;
  const collectionCounter = () => {
    for (let key in firebasedata) {
      firebasedata[key].forEach((obj) => {
        count += 1;
      });
    }
    return count;
  };
  const items = [
    {
      id: 1,
      icon: <BsFillCollectionPlayFill className="icon" />,
      label: "collections",
      value: collectionCounter(),
      color: "yellow",
    },
  ];

  return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          <p>{twitter_username || "No Twitter Account Added"}</p>
        </div>
        {/* <a href={html_url}>follow</a> */}
      </header>
      <p className="bio">{bio}</p>
      {items.map((item) => {
        return (
          <article className="item" key={item.id}>
            <span className={item.color}>{item.icon}</span>
            <div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </article>
        );
      })}
      <div className="links">
        <p>
          <MdBusiness></MdBusiness> {company || "No company is given"}
        </p>
        <p>
          <MdLocationOn></MdLocationOn> {location || "no home town"}
        </p>
        <a href={`https://${blog}`}>
          <MdLink></MdLink>
          {blog || "No personal blog given"}
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: "Collection";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  .bio {
    color: var(--clr-grey-3);
  }
  
`;

export default CollectionCard;
