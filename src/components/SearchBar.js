import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchDrinkApi from '../services/fetchApiDrink';
import fetchFoodApi from '../services/fetchApiFood';
import { MAX_NUMBER_CARDS } from '../services/consts';

function SearchBar({ name }) {
  const { searchInput } = useContext(MyContext);

  const [radioValue, setRadioValue] = useState('');
  const [apiResultsSplited, setApiResultsSplited] = useState({ [name]: [] });

  const history = useHistory();

  function handleRadio({ target }) {
    setRadioValue(target.value);
  }

  // Consome as APIs de foods.
  async function searchFoods() {
    if (radioValue === 'ingredient') {
      const result = await fetchFoodApi(`filter.php?i=${searchInput}`);
      return result;
    } if (radioValue === 'name') {
      const result = await fetchFoodApi(`search.php?s=${searchInput}`);
      return result;
    } if (radioValue === 'first-letter') {
      if (searchInput.length <= 1) {
        const result = await fetchFoodApi(`search.php?f=${searchInput}`);
        return result;
      }
      global.alert('Your search must have only 1 (one) character');
    }
  }

  // Consome as APIs de drinks.
  async function searchDrinks() {
    if (radioValue === 'ingredient') {
      const result = await fetchDrinkApi(`filter.php?i=${searchInput}`);
      return result;
    } if (radioValue === 'name') {
      const result = await fetchDrinkApi(`search.php?s=${searchInput}`);
      return result;
    } if (radioValue === 'first-letter') {
      if (searchInput.length <= 1) {
        const result = await fetchDrinkApi(`search.php?f=${searchInput}`);
        return result;
      }
      global.alert('Your search must have only 1 (one) character');
    }
  }

  // Recebe os valores da API de foods e lida com esses valores.
  async function mealsCondition() {
    const returnFoodsApi = await searchFoods();
    if (returnFoodsApi !== undefined) {
      if (returnFoodsApi.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnFoodsApi.meals.length === 1) {
        history.push(`/foods/${returnFoodsApi.meals[0].idMeal}`);
      } else if (returnFoodsApi.meals.length >= MAX_NUMBER_CARDS) {
        const splitedArray = returnFoodsApi[name].slice(0, MAX_NUMBER_CARDS);
        setApiResultsSplited({ [name]: splitedArray });
      } else {
        setApiResultsSplited({ [name]: returnFoodsApi.meals });
      }
    }
  }

  // Recebe os valores da API de drinks e lida com esses valores.
  async function drinkCondition() {
    const returnDrinkApi = await searchDrinks();
    if (returnDrinkApi !== undefined) {
      if (returnDrinkApi.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnDrinkApi.drinks.length === 1) {
        history.push(`/drinks/${returnDrinkApi.drinks[0].idDrink}`);
      } else if (returnDrinkApi.drinks.length >= MAX_NUMBER_CARDS) {
        const splitedArray = returnDrinkApi[name].slice(0, MAX_NUMBER_CARDS);
        setApiResultsSplited({ [name]: splitedArray });
      } else {
        setApiResultsSplited({ [name]: returnDrinkApi.meals });
      }
    }
  }

  function fetchApi() {
    if (name === 'meals') {
      mealsCondition();
    } else {
      drinkCondition();
    }
  }

  // Renderiza os Cards de foods/drinks na tela.
  function renderCards() {
    return apiResultsSplited[name].length > 0 && name === 'meals' ? (
      apiResultsSplited[name].map(({ strMeal, strMealThumb }, index) => (
        <div
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
          <p data-testid={ `${index}-card-name` }>
            {' '}
            { strMeal }
          </p>
        </div>
      ))
    ) : (
      apiResultsSplited[name].map(({ strDrink, strDrinkThumb }, index) => (
        <div
          key={ strDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ strDrink }
          />
          <p data-testid={ `${index}-card-name` }>
            {' '}
            { strDrink }
          </p>
        </div>
      ))
    );
  }
  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          onChange={ handleRadio }
          type="radio"
          id="ingredient"
          value="ingredient"
          name="radio"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          onChange={ handleRadio }
          type="radio"
          id="name"
          value="name"
          name="radio"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="first-letter">
        First letter
        <input
          onChange={ handleRadio }
          type="radio"
          id="first-letter"
          value="first-letter"
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
      {renderCards()}
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};
export default SearchBar;
