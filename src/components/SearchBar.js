import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchDrinkApi from '../services/fetchApiDrink';
import fetchFoodApi from '../services/fetchApiFood';

function SearchBar({ name }) {
  const [radioValue, setRadioValue] = useState('');
  const [apiResults, setApiResults] = useState([]);

  const { searchInput } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    if (apiResults.meals !== undefined || apiResults.drinks !== undefined) {
      if (name === 'Foods') {
        if (apiResults.meals.length === 1) {
          history.push(`/foods/${apiResults.meals[0].idMeal}`);
        }
      } else if (apiResults.drinks.length === 1) {
        history.push(`/drinks/${apiResults.drinks[0].idDrink}`);
      }
    }
  }, [apiResults]);

  function handleRadio({ target }) {
    setRadioValue(target.value);
  }

  async function searchFoods() {
    if (radioValue === 'ingrediente') {
      const result = await fetchFoodApi(`filter.php?i=${searchInput}`);
      setApiResults(result);
    } if (radioValue === 'nome') {
      const result = await fetchFoodApi(`search.php?s=${searchInput}`);
      setApiResults(result);
    } if (radioValue === 'letra') {
      if (searchInput.length <= 1) {
        const result = await fetchFoodApi(`search.php?f=${searchInput}`);
        setApiResults(result);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  }

  async function searchDrinks() {
    if (radioValue === 'ingrediente') {
      const result = await fetchDrinkApi(`filter.php?i=${searchInput}`);
      setApiResults(result);
    } if (radioValue === 'nome') {
      const result = await fetchDrinkApi(`search.php?s=${searchInput}`);
      setApiResults(result);
    } if (radioValue === 'letra') {
      if (searchInput.length <= 1) {
        const result = await fetchDrinkApi(`search.php?f=${searchInput}`);
        setApiResults(result);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  }

  async function fetchApi() {
    if (name === 'Foods') {
      searchFoods();
    } else {
      searchDrinks();
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

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};
export default SearchBar;
