import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchNameForm = ({ handleNameSearch }) => {
  //hook
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNameSearch(name);
    setName("");
  };

  return (
    <div className="search__container">
      <div className="iconSearch">
        <FaSearch />
      </div>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__form-input"
          name="name"
          id="name"
          type="text"
          placeholder=" type Name or Id number"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="form__btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchNameForm;
