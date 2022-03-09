import React from 'react';

function SearchBar() {
  console.log('ola sou search');
  return (
    <div>
      <label htmlFor="ingrediente">
        Ingredient
        <input
          type="radio"
          id="ingrediente"
          value="ingrediente"
          name="radio"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="nome">
        Name
        <input
          type="radio"
          id="nome"
          value="nome"
          name="radio"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="letra">
        First letter
        <input
          type="radio"
          id="letra"
          value="letra"
          name="radio"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
