import React from "react";

export default function InputSearch({ getMovie }) {
  return (
    <div className="InputSearch">
      <input
        type="text"
        placeholder="Movie to search"
        className="form-control"
        onChange={(event) => getMovie(event.target.value)}
      />
    </div>
  );
}
