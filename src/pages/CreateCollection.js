import React, { useState } from "react";
import firebase from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";

import { GithubContext } from "../context/context";
import { Alert, CreateCollectionForm } from "../components";

function CreateCollection() {
  const { user } = useAuth0();

  var someDate = new Date();
  var date =
    someDate.getMonth() +
    1 +
    "/" +
    someDate.getDate() +
    "/" +
    someDate.getFullYear();
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });
  const [collectionName, setCollectionName] = useState("");
  const [type, setType] = useState("React");

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedRepos, setSelectedRepos] = useState([]);

  const { repos, firebasedata, addToDb, searchGithubUser } = React.useContext(
    GithubContext
  );

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const ResetState = () => {
    setCollectionName("");
    setType("React");
    setSelectedRepos("");
    showAlert(true, "success", "Collection is Created");
    searchGithubUser();
    filterRepoList();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionName || selectedRepos.length === 0) {
      showAlert(
        true,
        "danger",
        "Please enter the collection name and please select atleast one repo"
      );
    } else {
      const newRepo = selectedRepos.map((obj) => {
        return { id: obj.id, name: obj.name, html_url: obj.html_url };
      });

      const object = {
        collectionName: collectionName,
        created_at: selectedDate,
        type: type,
        repo: newRepo,
      };
      addToDb(object, user.name);
      ResetState();
      e.target.reset();
    }
  };
  const filterRepoList = () => {
    const newRepo = repos.filter((repo) => {
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
        return repo;
      }
      return;
    });
    return newRepo;
  };

  return (
    <article>
      <section className="section-center">
        <h1 style={{ justifyContent: "center", alignItems: "center" }}>
          Create Collection
        </h1>
      </section>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <CreateCollectionForm
        alert={alert}
        showAlert={showAlert}
        handleSubmit={handleSubmit}
        collectionName={collectionName}
        setCollectionName={setCollectionName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRepos={selectedRepos}
        setSelectedRepos={setSelectedRepos}
        type={type}
        setType={setType}
        list={filterRepoList()}
      />
    </article>
  );
}

export default CreateCollection;
