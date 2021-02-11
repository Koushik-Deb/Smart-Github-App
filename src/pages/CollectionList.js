import React, { useContext, useState, useEffect } from "react";
import { GithubContext } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import {
  MyCollectionListComponent,
  Pagination,
  Filter,
  Alert,
  SearchCollection,
} from "../components";

function CollectionList() {
  const { firebasedata, searchGithubUser, deleteFromDB } = useContext(
    GithubContext
  );
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [myArray, setMyArray] = useState([]);
  const [myCurArray, setMyCurArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });
  /// filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getSearchList = (e) => {
    e.preventDefault();

    if (searchTerm) {
      setMyCurArray([]);
      for (let key in firebasedata) {
        firebasedata[key].forEach((obj) => {
          if (
            searchTerm &&
            obj.collectionName.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            setMyCurArray((old) => [...old, obj]);
            setCurrentPage(1);
          }
        });
      }
    } else {
      showAlert(true, "danger", "Please provide some data ");
    }
  };

  const toList = () => {
    for (let key in firebasedata) {
      let count = 0;
      firebasedata[key].forEach((obj) => {
        const newobj = { ...obj, index: count };
        setMyArray((old) => [...old, newobj]);
        setMyCurArray((old) => [...old, newobj]);
        count++;
      });
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const filterList = () => {
    setMyCurArray([]);
    const filteredList = myArray.filter((obj) => {
      if (startDate) {
        var objDate = new Date(obj.created_at);
        var start = new Date(startDate);
        var end = new Date(endDate);
        if (
          type &&
          objDate.getTime() >= start.getTime() - 1000 * 60 * 60 * 24 &&
          objDate.getTime() <= end.getTime() &&
          obj.type === type
        ) {
          return obj;
        } else if (
          !type &&
          objDate.getTime() >= start.getTime() - 1000 * 60 * 60 * 24 &&
          objDate.getTime() <= end.getTime()
        ) {
          return obj;
        }
      } else {
        if (obj.type === type) {
          return obj;
        }
        return;
      }
      return;
    });
    setMyCurArray(filteredList);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((startDate && !endDate) || (!startDate && endDate)) {
      showAlert(true, "danger", "Please provide both start and end date");
    } else if (!startDate && !endDate && !type) {
      showAlert(true, "danger", "Please provide some data ");
    } else {
      filterList();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setMyArray([]);
    setMyCurArray([]);
    toList();
    setIsLoading(false);
  }, [firebasedata]);

  useEffect(() => {
    searchGithubUser(user.name);
    setMyCurArray(myArray);
  }, []);

  ///pagination
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myCurArray.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="section-center">
        <h1 style={{ justifyContent: "center", alignItems: "center" }}>
          My Collection List
        </h1>
      </section>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <SearchCollection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getSearchList={getSearchList}
      />
      <Filter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        type={type}
        setType={setType}
        handleSubmit={handleSubmit}
      />
      <div className="section">
        <MyCollectionListComponent
          isLoading={isLoading}
          postList={currentPosts}
          deleteFromDB={deleteFromDB}
          paginate={paginate}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myCurArray.length}
          paginate={paginate}
        />
        {/* </Wrapper> */}
      </div>
    </>
  );
}

export default CollectionList;
