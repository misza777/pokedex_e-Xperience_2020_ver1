import React from "react";
import "./Card.css";
// import nodata from '/../../public/nodata.png';
// import kolorow wlasciwosci
import pokemonColorTypes from "../../helpers/pokemonColorTypes";

const Card = (props) => {
  // mozesz tez napisac zamiast props {pokemon}
  const { pokemon } = props;
  // jak mamyobiekt to jest prosciej jak tablice to iterujemy lub przekazujemy indexy
  let pokemonFoto = pokemon.sprites.front_default;

  return (
    <div className="Card">
      {pokemonFoto ? (
        <div className="Card__img">
          <div className="Card__img--normal">
            <img
              src={pokemon.sprites.front_default}
              alt="pokemon_front_image"
            />
            <img src={pokemon.sprites.back_default} alt="pokemon_back_image" />
          </div>

          <div className="Card__img--shiny">
            <img
              src={pokemon.sprites.front_shiny}
              alt="pokemon_front__shiny_image"
            />
            <img
              src={pokemon.sprites.back_shiny}
              alt="pokemon_back_shiny_image"
            />
          </div>
        </div>
      ) : (
        <div className="Card__img">
        <img className="nologo" src={"/nodata.png"} alt="no-data_image" />
        </div>
      )}
      ;{/* nazwa i typy */}
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
