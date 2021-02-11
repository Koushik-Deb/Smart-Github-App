import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import { SingleRepoCommitComponent } from "../components";

function SingleRepoCommit() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, repo } = useParams();
  const url = `https://api.github.com/repos/${name}/${repo}/commits`;
  const getCommit = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setHistory([]);
        setLoading(false);
        if (error.response.status !== 409) {
          setError(true);
        }
        setErrorMsg(error.response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getCommit(url);
  }, []);

  return (
    <SingleRepoCommitComponent
      loading={loading}
      error={error}
      errorMsg={errorMsg}
      history={history}
    />
  );
}
export default SingleRepoCommit;
