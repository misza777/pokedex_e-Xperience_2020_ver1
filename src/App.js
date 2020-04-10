import React, { useState, useEffect } from "react";
// useState - state
// useEffect - methods of lifecycle
// import logo from "./logo.svg";
import { getAllPokemon, getSinglePokemon } from "./services/pokemon";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import "./App.css";

function App() {
  // hooks
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  //search hooks

  // const [pokemonColor, setPokemonColor] = useState("");
  // const [pokemonType, setPokemonType] = useState("");

  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  // zachowuje sie jak componentdidmount, jak sie zamontuje component to wtedy uruchamiamy useEffect i  fetch data from url
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      // tutaj wyrzuca undefined poniewaz to wynika z async
      // wczesniejszy zapis
      await loadingSinglePokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  // [] clean it up only once (on mount and unmount)

  //paginacja i wywolanie fetcha nastepnej storny
  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    // console.log(nextUrl);
    await loadingSinglePokemon(data.results);
    setNextUrl(data.next);
    // console.log(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  //paginacja i wywolanie fetcha poprzedniej strony
  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingSinglePokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handleSearch = async (gender) => {
    setLoading(true);
    let data = await getAllPokemon(
      `https://pokeapi.co/api/v2/gender/${gender}/`
    );
    console.log(data);

    // let data1 = await getAllPokemon(
      // data.pokemon_species_details
    // );

    // console.log(data1);
    // await loadingSinglePokemon(data.pokemon_species_details);
    setLoading(false);
  };

  // teraz musimy wziac tablice tych 20 pokemonow i zrobic nastepnego promisa
  //przeiterowac kazdy z elementow
  const loadingSinglePokemon = async (data) => {
    // console.log(data);
    // promise to all - zwroci promisa jak wszystkie z tych zapytan zostana zwrocone. czyli jak przeiterujemy do konca i wrzucamy to wsyztsko do zmiennej _pokemonData
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        // kazdy obiekt ma dwie wartosci
        let pokemonRecord = await getSinglePokemon(pokemon.url);
        // console.log(pokemonRecord);
        //zwracamy wynik i przekazujemy do state
        return pokemonRecord;
      })
    );
    //zmieniamy stan
    setPokemonData(_pokemonData);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {/* <h1>Data is fetched!</h1> */}
          <Navbar />
          <SearchForm handleSearch={handleSearch} />
          <div className="btn">
            <button onClick={() => prev()}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              // eslint-disable-next-line no-lone-blocks
              {
                /* console.log(pokemon); */
              }
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;

// inspiracja:
// https://github.com/rivera1294/pokemon/tree/master/src
