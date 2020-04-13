export async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}

// export async function getSinglePokemon(url) {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//     .then((res) => res.json())
//     .then((data) => resolve(data))

//   });
// }

const emptyJson =
  //empty Json file
  {
    abilities: [
      {
        ability: {
          name: "no ability",
        },
      },
    ],
    id: 1,
    name: "Sorry! No Pokemon in Database",
    sprites: {
      back_default: "",
      back_shiny: "",
      front_default: "",
      front_shiny: "",
    },
    types: [
      {
        type: {
          name: "no types",
        },
      },
    ],
    height: "none",
    weight: "none",
  };

export async function getSinglePokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return emptyJson;
        // throw new Error(response.statusText);)
      })
      .then((data) => resolve(data));
  });
}
