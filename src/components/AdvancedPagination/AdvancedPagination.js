import React from "react";

const AdvancedPagination = ({ pokemonPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="btn pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdvancedPagination;
