import React, { useState } from "react";

const SearchGenderForm = ({ handleGenderSearch }) => {
  //hook
  const [gender, setGender] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenderSearch(gender);
  };

  return (
    <div className="search_container">
      <form className="search__form" onSubmit={handleSubmit}>
        <select
          className="search__form-input"
          name="gender"
          id="gender"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="1">Female</option>
          <option value="2">Male</option>
          <option value="3">Genderless</option>
        </select>
        <button className="form__btn" type="submit">
          Choose Gender
        </button>
      </form>
    </div>
  );
};

export default SearchGenderForm;
