import React, { useState, useContext /* useEffect */ } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchDrinkApi from '../services/fetchApiDrink';
import fetchFoodApi from '../services/fetchApiFood';

function SearchBar({ name }) {
  const [radioValue, setRadioValue] = useState('');
  // const [apiResults, setApiResults] = useState({ [name]: [] });
  const [apiResultsSplited, setApiResultsSplited] = useState({ [name]: [] });

  const { searchInput } = useContext(MyContext);

  const history = useHistory();
  const DOZE = 12;

  /*
  useEffect(() => {
    if (apiResults[name] !== undefined) {
      if (apiResults[name].length >= DOZE) {
        const splitedArray = apiResults[name].slice(0, DOZE);
        setApiResultsSplited({ [name]: splitedArray });
      }

      if (name === 'meals') {
        if (apiResults.meals.length === 1) {
          history.push(`/foods/${apiResults.meals[0].idMeal}`);
        }
      } else if (apiResults.drinks.length === 1) {
        history.push(`/drinks/${apiResults.drinks[0].idDrink}`);
      }
    }
  }, [apiResults]);
  */

  function handleRadio({ target }) {
    setRadioValue(target.value);
  }

  async function searchFoods() {
    if (radioValue === 'ingrediente') {
      const result = await fetchFoodApi(`filter.php?i=${searchInput}`);
      // setApiResults(result);
      return result;
    } if (radioValue === 'nome') {
      const result = await fetchFoodApi(`search.php?s=${searchInput}`);
      // setApiResults(result);
      return result;
    } if (radioValue === 'letra') {
      if (searchInput.length <= 1) {
        const result = await fetchFoodApi(`search.php?f=${searchInput}`);
        // setApiResults(result);
        return result;
      }
      global.alert('Your search must have only 1 (one) character');
    }
  }

  async function searchDrinks() {
    if (radioValue === 'ingrediente') {
      const result = await fetchDrinkApi(`filter.php?i=${searchInput}`);
      // setApiResults(result);
      return result;
    } if (radioValue === 'nome') {
      const result = await fetchDrinkApi(`search.php?s=${searchInput}`);
      // setApiResults(result);
      return result;
    } if (radioValue === 'letra') {
      if (searchInput.length <= 1) {
        const result = await fetchDrinkApi(`search.php?f=${searchInput}`);
        // setApiResults(result);
        return result;
      }
      global.alert('Your search must have only 1 (one) character');
    }
  }

  async function mealsCondition() {
    const returnFoodsApi = await searchFoods();
    if (returnFoodsApi !== undefined) {
      if (returnFoodsApi.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnFoodsApi.meals.length === 1) {
        history.push(`/foods/${returnFoodsApi.meals[0].idMeal}`);
      } else if (returnFoodsApi.meals.length >= DOZE) {
        const splitedArray = returnFoodsApi[name].slice(0, DOZE);
        setApiResultsSplited({ [name]: splitedArray });
      } else {
        setApiResultsSplited({ [name]: returnFoodsApi.meals });
      }
    }
  }

  async function drinkCondition() {
    const returnDrinkApi = await searchDrinks();
    if (returnDrinkApi !== undefined) {
      if (returnDrinkApi.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnDrinkApi.drinks.length === 1) {
        history.push(`/drinks/${returnDrinkApi.drinks[0].idDrink}`);
      } else if (returnDrinkApi.drinks.length >= DOZE) {
        const splitedArray = returnDrinkApi[name].slice(0, DOZE);
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
      {renderCards()}
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};
export default SearchBar;
