import React from "react";
import "./Navbar.css";
// import nodata from "../../img/nodata.png"
import pokeLogo from "../../img/pikaPokemon.png";
import SearchGenderForm from "../SearchGenderForm";
import SearchNameForm from "../SearchNameForm";
import { FaHome } from "react-icons/fa";

const Navbar = (props) => {
  const { handleGenderSearch, handleNameSearch, initial } = props;
  const handleClickHome = (e) => {
    e.preventDefault();
    initial();
  };

  return (
    <div className="Navbar">
      <div className="pokemon__logo">
        <img className="pokemon__logo-img" src={pokeLogo} alt="pokemon_logo" />
        <div className="pokemon__logo-name">Show me Pokemon!</div>
        <div className="icon" onClick={(e) => handleClickHome(e)}>
          <FaHome />
        </div>
      </div>
      <div className="navbar__menu">
        <SearchGenderForm handleGenderSearch={handleGenderSearch} />
        <SearchNameForm handleNameSearch={handleNameSearch} />
      </div>
    </div>
  );
};

export default Navbar;
