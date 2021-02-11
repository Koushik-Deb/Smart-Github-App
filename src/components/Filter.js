import React from "react";

function Filter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
  setType,
  handleSubmit,
}) {
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="startDate">Start Date: </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <label htmlFor="endDate">end Date: </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select</option>
            <option value="React">React</option>
            <option value="Angular">Angular</option>
            <option value="Python">Python</option>
            <option value="Vanilla">Vanilla Js</option>
          </select>
        </div>
        <button type="submit" className="button">
          filter
        </button>
      </form>
    </>
  );
}

export default Filter;
