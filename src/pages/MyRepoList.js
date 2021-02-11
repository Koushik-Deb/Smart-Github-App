import React, { useContext, useEffect } from "react";
import { MyRepoListComponent, Info } from "../components";
import { GithubContext } from "../context/context";

import { useAuth0 } from "@auth0/auth0-react";

function MyRepoList() {
  const { searchGithubUser } = useContext(GithubContext);
  const { user } = useAuth0();
  useEffect(() => {
    searchGithubUser(user.name);
  }, []);

  return (
    <div>
      <section className="section-center">
        <h1 style={{ justifyContent: "center", alignItems: "center" }}>
          My Repos
        </h1>
      </section>

      <Info />
      <MyRepoListComponent />
    </div>
  );
}

export default MyRepoList;
