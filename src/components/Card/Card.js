import React, { useState } from "react";
import "./Card.css";
// import kolorow wlasciwosci
import pokemonColorTypes from "../../helpers/pokemonColorTypes";
import nodata from "../../img/nodata.png";

const Card = (props) => {
  // mozesz tez napisac zamiast props {pokemon}
  const [active, setActive] = useState(false);

  const { pokemon } = props;
  // jak mamyobiekt to jest prosciej jak tablice to iterujemy lub przekazujemy indexy
  const pokemonFrontFoto = pokemon.sprites.front_default;
  const pokemonBackFoto = pokemon.sprites.back_default;
  const pokemonBackShinyFoto = pokemon.sprites.back_shiny;

  const showElement = () => {
    setActive(!active);
  };

  return (
    <div className="Card">
      {pokemonFrontFoto ? (
        <div className="Card__img">
          <div className="Card__img--normal">
            <img
              src={pokemon.sprites.front_default}
              alt="pokemon_front_image"
            />
            {pokemonBackFoto ? (
              <img
                src={pokemon.sprites.back_default}
                alt="pokemon_back_image"
              />
            ) : null}
          </div>
          <button className="showBtn" onClick={showElement}>
            {active ? "hide shiny version" : "show shiny version"}
          </button>
          {active ? (
            <div className="Card__img--shiny">
              <img
                src={pokemon.sprites.front_shiny}
                alt="pokemon_front__shiny_image"
              />
              {pokemonBackShinyFoto ? (
                <img
                  src={pokemon.sprites.back_shiny}
                  alt="pokemon_back_shiny_image"
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="Card__img">
          <img
            className="nologo"
            // src={process.env.PUBLIC_URL + "/nodata.png"}
            src={nodata}
            alt="nodata_image"
          />
        </div>
      )}
      {/* nazwa i typy */}
      <div className="Card__name">{pokemon.name}</div>
      <p className="Card__type__title">Type:</p>
      <div className="Card__types">
        {pokemon.types.map((typeArr, i) => {
          return (
            <div
              className="Card__type"
              key={i}
              style={{
                backgroundColor: pokemonColorTypes[typeArr.type.name],
              }}
            >
              {typeArr.type.name}
            </div>
          );
        })}
      </div>
      {/* pozostale info */}
      <div className="Card__info">
        <div className="Card__data">
          <p className="title">Weight</p>
          <p className="Card__data--value">{pokemon.weight}</p>
        </div>
      </div>
      <div className="Card__info">
        <div className="Card__data">
          <p className="title">Height</p>
          <p className="Card__data--value">{pokemon.height}</p>
        </div>
      </div>
      <div className="Card__info">
        <div className="Card__data">
          <p className="title">Ability</p>
          {pokemon.abilities.map((ability, i) => {
            return (
              <p className="Card__type--ability" key={i}>
                {ability.ability.name}
              </p>
            );
          })}
        </div>
      </div>
      {/* // inna wersja   */}
      {/* // return pokemon.abilities[0].ability.name  */}
    </div>
  );
};

export default Card;
