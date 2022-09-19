import React from "react";

export default function SelectType({ getType }) {
  return (
    <div>
      <select
        className="form-control md-3"
        name=""
        id=""
        onChange={(event) => getType(event.target.value)}
      >
        <option value="Movie">Movie</option>
        <option value="Series">Series</option>
        <option value="Episodes">Episodes</option>
      </select>
    </div>
  );
}
