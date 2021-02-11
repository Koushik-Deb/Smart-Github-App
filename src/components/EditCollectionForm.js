import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

function EditCollectionForm(props) {
  if (props.loading) {
    return <>Loading</>;
  } else {
    return (
      <>
        <form className="form" onSubmit={props.handleSubmit}>
          <div className="form-control">
            <label htmlFor="collectionName">Collection Name: </label>
            <input
              type="text"
              id="collectionName"
              name="collectionName"
              value={props.collectionName}
              onChange={(e) => props.setCollectionName(e.target.value)}
            ></input>
            <label htmlFor="date">Date of Editing: </label>
            <input
              id="date"
              type="text"
              name="date"
              value={props.selectedDate}
              readOnly={true}
              onChange={(e) => props.setSelectedDate(e.target.value)}
            />
            <label>Pick your Type:</label>
            <select
              value={props.type}
              onChange={(e) => props.setType(e.target.value)}
            >
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Python">Python</option>
              <option value="Vanilla">Vanilla Js</option>
            </select>
            <label>Select Public Repos</label>
            <Multiselect
              options={props.list}
              displayValue="name"
              selectedValues={props.selectedRepos}
              onSelect={
                (data) => props.setSelectedRepos(data)
                // props.setList((prev) => [...prev, e.target.selectedOptions])
              }
              resetButtonText="reset"
            ></Multiselect>
          </div>

          <button type="submit" className="button">
            Add Collection
          </button>
        </form>
      </>
    );
  }
}

export default EditCollectionForm;
