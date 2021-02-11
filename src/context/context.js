import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import firebase from "../firebase";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const { user } = useAuth0();
  const [githubUser, setGithubUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const [firebasedata, setfirebasedata] = useState({});
  const ref = firebase.firestore().collection("GitUsers");

  const getFirebaseData = async (username) => {
    ref
      .doc(username)
      .get()
      .then((doc) => setfirebasedata(doc.data()));
  };

  const addToDb = (object, username) => {
    if (username.includes("@")) {
      username = user.nickname;
    }
    ref
      .doc(username)
      .update({
        collectionName: firebase.firestore.FieldValue.arrayUnion(object),
      })
      .catch((err) => {
        ref.doc(username).set({
          collectionName: firebase.firestore.FieldValue.arrayUnion(object),
        });
      });
  };

  const UpdateInDb = async (index, object, username = user.name) => {
    if (username.includes("@")) {
      username = user.nickname;
    }
    const newCollection = firebasedata["collectionName"].map((obj, ind) => {
      if (ind === index) {
        return object;
      } else {
        return obj;
      }
    });
    ref.doc(username).set({
      collectionName: newCollection,
    });
  };

  const deleteFromDB = async (index, username = user.name) => {
    if (username.includes("@")) {
      username = user.nickname;
    }
    getFirebaseData(username);
    const newCollection = firebasedata["collectionName"].filter(
      (object, ind) => ind != index
    );
    ref.doc(username).update({
      collectionName: firebase.firestore.FieldValue.delete(),
    });

    ref.doc(username).set({
      collectionName: newCollection,
    });
  };

  const searchGithubUser = async (username = user.name) => {
    if (username.includes("@")) {
      username = user.nickname;
    }
    toggleError();
    setIsLoading(true);
    const response = await axios(
      `${rootUrl}/users/${username}`
    ).catch((error) => console.log(error));
    getFirebaseData(username);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "no such user exists");
    }
    setIsLoading(false);
    checkRequests();
  };
  //////// axioms or fetch
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "sorry,you have exceeded the request limit for this hour"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    checkRequests();
    // getFirebaseData();
  }, []);

  useEffect(() => {
    if (user) {
      searchGithubUser(user.name);
    }
  }, [user]);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
        firebasedata,
        getFirebaseData,
        addToDb,
        UpdateInDb,
        deleteFromDB,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
