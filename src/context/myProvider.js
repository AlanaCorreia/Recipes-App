import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DEFAULT_URL_API, MAX_NUMBER_RECOMMEDATIONS } from '../services/consts';
import fetchDrinkApi from '../services/fetchApiDrink';
import fetchFoodApi from '../services/fetchApiFood';
import MyContext from './myContext';

function MyProvider({ children }) {
  const [searchInput, setsearchInput] = useState('');
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [drinkRecommendation, setDrinkRecommendation] = useState([]);

  function handleSearch({ target }) {
    setsearchInput(target.value);
  }

  async function getMealsRecommended() {
    const resultApiMeals = await fetchFoodApi(DEFAULT_URL_API);
    const recommended = resultApiMeals.meals.slice(0, MAX_NUMBER_RECOMMEDATIONS);
    setMealsRecommendation(recommended);
  }

  async function getDrinksRecommended() {
    const resultApiDrinks = await fetchDrinkApi(DEFAULT_URL_API);
    const recommended = resultApiDrinks.drinks.slice(0, MAX_NUMBER_RECOMMEDATIONS);
    setDrinkRecommendation(recommended);
  }

  useEffect(() => {
    getMealsRecommended();
    getDrinksRecommended();
  }, []);

  const INITIAL_STATE = {
    handleSearch,
    searchInput,
    setsearchInput,
    searchBarShow,
    setSearchBarShow,
    mealsRecommendation,
    setMealsRecommendation,
    drinkRecommendation,
    setDrinkRecommendation,
  };
  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      {children}
    </MyContext.Provider>
  );
}
MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;
export default MyProvider;
