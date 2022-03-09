import React, { useState, useContext } from 'react';
import MyContext from '../context/myContext';
import fetchFoodApi from '../services/fetchApiFood';

function SearchBar() {
  const [radioValue, setRadioValue] = useState('');

  const { searchInput } = useContext(MyContext);

  function handleRadio({ target }) {
    setRadioValue(target.value);
  }

  async function fetchApi() {
    if (radioValue === 'ingrediente') {
      const result = await fetchFoodApi(`filter.php?i=${searchInput}`);
      console.log(result);
    } if (radioValue === 'nome') {
      const result = await fetchFoodApi(`search.php?s=${searchInput}`);
      console.log(result);
    } if (radioValue === 'letra') {
      if (searchInput.length <= 1) {
        const result = await fetchFoodApi(`search.php?f=${searchInput}`);
        console.log(result);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  }

  return (
    <div>
      <label htmlFor="ingrediente">
        Ingredient
        <input
          onChange={ handleRadio }
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
          onChange={ handleRadio }
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
          onChange={ handleRadio }
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
        onClick={ fetchApi }
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
