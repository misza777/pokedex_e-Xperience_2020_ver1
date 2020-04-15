import React from "react";
import Card from "../Card/Card";

const PokemonContent = ({ pokemonData, loading }) => {
  // console.log(pokemonData);
  // console.log(typeof pokemonData);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid-container">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </>
  );
};

export default PokemonContent;
