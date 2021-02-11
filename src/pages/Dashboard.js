import React, { useEffect } from "react";
import { GithubContext } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";

import { User, HomePageButton } from "../components";
import loadingImage from "../images/preloader.gif";

const Dashboard = () => {
  const { user } = useAuth0();
  const { isLoading, searchGithubUser } = React.useContext(GithubContext);

  useEffect(() => {
    searchGithubUser(user.name);
  }, [user]);

  if (isLoading) {
    return (
      <main>
        <HomePageButton />
        <img className="loading-img" src={loadingImage} alt="spinner" />
      </main>
    );
  }

  return (
    <main>
      <HomePageButton />
      <User />
    </main>
  );
};

export default Dashboard;
