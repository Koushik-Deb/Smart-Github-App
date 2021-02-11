import React from "react";

function SearchCollection({ searchTerm, setSearchTerm, getSearchList }) {
  return (
    <>
      <form className="form" onSubmit={getSearchList}>
        <div className="form-control">
          <label htmlFor="search">Search Collection : </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="e.g. collection name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchCollection;
