import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import { getAllPokemon, getSinglePokemon } from "./services/pokemon";
import Navbar from "./components/Navbar";
import SimplePagination from "./components/SimplePagination";
import AdvancedPagination from "./components/AdvancedPagination";
// import SearchGenderForm from "./components/SearchGenderForm";
import PokemonContent from "./components/PokemonContent";
import "./App.css";

function App() {
  // hooks
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(20);
  const [totalPokemons, setTotalPokemons] = useState(0);
  // const [indexOfFirstPokemon, setIndexOfFirstPokemon] = useState(0);
  const [gender, setGender] = useState(0);

  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  // zachowuje sie jak componentdidmount, jak sie zamontuje component to wtedy uruchamiamy useEffect i  fetch data from url
  useEffect(() => {
    setSearching(false);
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      // console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingSinglePokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  // [] clean it up only once (on mount and unmount), unikamy zapetlenia renderu never ending loop, uruchamia sie tylko raz

  //paginacja podstawowa i wywolanie fetcha nastepnej storny
  const next = async () => {
    setLoading(true);
    setSearching(false);
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
    setSearching(false);
    let data = await getAllPokemon(prevUrl);
    await loadingSinglePokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  //obsluguje wyszukiwanie za pomoca search option wg gender
  const handleGenderSearch = async (gender) => {
    setSearching(true);
    setLoading(true);
    setGender(gender);
    const pokemonGenderArray = [];
    let data = await getAllPokemon(
      `https://pokeapi.co/api/v2/gender/${gender}/`
    );
    // 1. wyjecie z json gender nazwy pokemonow i przelozenie do tablicy pokemonGenderArray
    data.pokemon_species_details.map((pokemon) => {
      let pokemonName = pokemon.pokemon_species.name;
      pokemonGenderArray.push(pokemonName);
      return pokemonGenderArray;
    });
    setTotalPokemons(pokemonGenderArray.length);

    //2. pociac tablice na czesci po 20 szt funkcja chunk
    let chunked_arr = chunk(pokemonGenderArray, pokemonPerPage);
    // 3. dopasowac nr kliknietej strony do odpowiedniej tablicy - i tu jest problem - nie chce sie dopasowac setCurrenPage!

    console.log(`currentPage: ${currentPage}`);
    //UWAGA tutaj jest problem, currentPage nie chce sie uaktualnic currentPage mimo ze kliknieta paginacja - jak to zrobic?
    let currentPokemonArr = chunked_arr[currentPage - 1];
    // 1a. stworzyc tablice z linkami do funkcji wywolujacej
    currentPokemonArr = currentPokemonArr.map(
      (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    //2a. wywolac w funkcji

    await loadingSearchedPokemon(currentPokemonArr);
    setLoading(false);
  };

  // zdublowana funckja ladujaca pokemony na strone, warto by to ujednolicic
  const loadingSearchedPokemon = async (data) => {
    //niestety mnoze funkcje :(
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getSinglePokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // funkcja ladujaca pojedyncze pokemony na strone główną
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

  //change page in pagination, przekazanyz klikniecia pageNumber w AdvancedPagination to jest zmienna number
  const paginate = (pageNumber) => {
    console.log(`pageNumber: ${pageNumber}`);
    handleGenderSearch(gender);
    setCurrentPage(pageNumber);
  };

  // unkcja krojaca tablice
  function chunk(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

  return (
    <>
      <Navbar handleGenderSearch={handleGenderSearch} />
      {/* <SearchGenderForm handleSearch={handleSearch} /> */}
      {searching ? (
        <AdvancedPagination
          pokemonPerPage={pokemonPerPage}
          totalPokemons={totalPokemons}
          paginate={paginate}
        />
      ) : (
        <SimplePagination next={next} prev={prev} />
      )}
      <PokemonContent pokemonData={pokemonData} loading={loading} />
      <SimplePagination next={next} prev={prev} />
    </>
  );
}

export default App;

// inspiracja:
//TraversyMedia
// https://github.com/rivera1294/pokemon/tree/master/src
//stackoverflow
