import React from "react";
import "./Navbar.css";
// import nodata from "../../img/nodata.png"
import pokeLogo from "../../img/pikaPokemon.png";
import SearchGenderForm from "../SearchGenderForm";

const Navbar = ({ handleGenderSearch }) => {
  return (
    <div className="Navbar">
      <div className="pokemon__logo">
        <img className="pokemon__logo-img" src={pokeLogo} alt="pokemon_logo" />
        <div className="pokemon__logo-name">Pokemon API</div>
      </div>
      <div className="navbar__menu">
        <SearchGenderForm handleGenderSearch={handleGenderSearch} />
      </div>
    </div>
  );
};

export default Navbar;
