import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <img
        src={process.env.PUBLIC_URL + "/pikaPokemon.png"}
        alt="pokemon_logo"
      />
      <div>Pokemon API</div>
    </div>
  );
};

export default Navbar;
