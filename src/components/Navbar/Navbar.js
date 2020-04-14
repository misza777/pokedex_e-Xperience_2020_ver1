import React from "react";
import "./Navbar.css";
// import nodata from "../../img/nodata.png"
import pokeLogo from "../../img/pikaPokemon.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <img src={pokeLogo} alt="pokemon_logo" />
      <div>Pokemon API</div>
    </div>
  );
};

export default Navbar;
