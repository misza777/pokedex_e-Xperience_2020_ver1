import React, { useState } from "react";

const SearchGenderForm = ({ handleSearch }) => {
  // hook idzie do komponentu!!!
  const [gender, setGender] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(gender);
  };

  return (
    <div className="search btn">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="gender">
          <select
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
          <button type="submit">Choose Gender</button>
        </label>
      </form>
    </div>
  );
};

export default SearchGenderForm;
