import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import { getAllPokemon, getSinglePokemon } from "./services/pokemon";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import SimplePagination from "./components/SimplePagination";
import SearchGenderForm from "./components/SearchGenderForm";
import "./App.css";

function App() {
  // hooks
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

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

  //paginacja podstawowa i wywolanie fetcha nastepnej storny
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

  //obsluguje wyszukiwanie za pomoca option gender
  const handleSearch = async (gender) => {
    setLoading(true);
    const pokemonGenderArray = [];
    let data = await getAllPokemon(
      `https://pokeapi.co/api/v2/gender/${gender}/`
    );
    console.log(data);
    // 1. wyjecie z json gender nazwy pokemonow i przelozenie do tablicy pokemonGenderArray
    data.pokemon_species_details.map((pokemon) => {
      let pokemonName = pokemon.pokemon_species.name;
      // console.log(pokemonName);
      pokemonGenderArray.push(pokemonName);
      return pokemonGenderArray;
    });
    console.log(pokemonGenderArray);
    //2. teraz trzeba to pociac na czesci po 20 szt
    //na razie wezme pierwsze 20 szt
    let newPokemonArr = pokemonGenderArray.slice(0, 20);
    console.log(newPokemonArr);
    // stworzyc tablice z linkami do funkcji wywolujacej
    newPokemonArr = newPokemonArr.map(
      (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    console.log(newPokemonArr);
    //2. wywolac w funkcji
    await loadingSearchedPokemon(newPokemonArr);
    setLoading(false);
  };
  // zdublowana funckja ladujaca pokemony na strone
  const loadingSearchedPokemon = async (data) => {
    //niestety mnozymy funkcje :((((
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getSinglePokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // funkcja ladujaca pojedyncze pokemony na strone
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
          <SearchGenderForm handleSearch={handleSearch} />
          <SimplePagination next={next} prev={prev} />
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <SimplePagination next={next} prev={prev} />
        </>
      )}
    </>
  );
}

export default App;

// inspiracja:
// https://github.com/rivera1294/pokemon/tree/master/src
