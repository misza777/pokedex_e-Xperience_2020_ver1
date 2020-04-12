import React from "react";

const AdvancedPagination = ({ pokemonPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(`totalPokemons: ${totalPokemons}`);
  console.log(`pokemonPerPage: ${pokemonPerPage}`);

  return (
    <nav>
      <ul className="btn pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdvancedPagination;
