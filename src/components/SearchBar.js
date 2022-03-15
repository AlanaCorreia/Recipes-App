import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchDrinkApi from '../services/fetchApiDrink';
import fetchFoodApi from '../services/fetchApiFood';
import { DEFAULT_URL_API, MAX_NUMBER_CARDS,
  MAX_NUMBER_CATEGORIES } from '../services/consts';
import { searchDrinks, searchFoods } from '../services/searchApiByInputs';
import { validateDrinks, validateMeals } from '../services/validateDatas';
import renderCards from './renderCards';
import '../PrincipalPage.css';
import '../Header.css';

function SearchBar({ name }) {
  const { searchInput, searchBarShow, handleSearch } = useContext(MyContext);

  const [radioValue, setRadioValue] = useState('');
  const [apiResultsSplited, setApiResultsSplited] = useState({ [name]: [] });
  const [categories, setCategories] = useState({ [name]: [] });
  const history = useHistory();
  function handleRadio({ target }) {
    setRadioValue(target.value);
  }
  // ComponentDidMout montando os filtros e o retorno default da API
  useEffect(() => {
    const fetchApiInitial = async () => {
      if (name === 'meals') {
        const foodCategories = await fetchFoodApi('list.php?c=list');
        const splitedfoodCategories = foodCategories[name]
          .slice(0, MAX_NUMBER_CATEGORIES);
        const foodResponse = await fetchFoodApi(DEFAULT_URL_API);
        const splitedFoodResponse = foodResponse[name].slice(0, MAX_NUMBER_CARDS);
        setCategories({ [name]: splitedfoodCategories });
        setApiResultsSplited({ [name]: splitedFoodResponse });
      } else {
        const drinkCategories = await fetchDrinkApi('list.php?c=list');
        const splitedDrinkCategories = drinkCategories[name]
          .slice(0, MAX_NUMBER_CATEGORIES);
        const drinkResponse = await fetchDrinkApi(DEFAULT_URL_API);
        const splitedDrinkResponse = drinkResponse[name].slice(0, MAX_NUMBER_CARDS);
        setCategories({ [name]: splitedDrinkCategories });
        setApiResultsSplited({ [name]: splitedDrinkResponse });
      }
    };
    fetchApiInitial();
  }, []);
  // função para realizar as pesquisas
  async function searchButton() {
    if (name === 'meals') {
      const dataFoodToValidate = await searchFoods(radioValue, searchInput);
      validateMeals(name, dataFoodToValidate, setApiResultsSplited, history);
    } else {
      const dataDrinkToValidate = await searchDrinks(radioValue, searchInput);
      validateDrinks(name, dataDrinkToValidate, setApiResultsSplited, history);
    }
  }
  // função que renderiza as APIs com o retorno padrão
  async function defaultAPI() {
    if (name === 'meals') {
      const foodResponse = await fetchFoodApi(DEFAULT_URL_API);
      const splitedFoodResponse = foodResponse[name].slice(0, MAX_NUMBER_CARDS);
      console.log(splitedFoodResponse);
      setApiResultsSplited({ [name]: splitedFoodResponse });
    } else {
      const drinkResponse = await fetchDrinkApi(DEFAULT_URL_API);
      const splitedDrinkResponse = drinkResponse[name].slice(0, MAX_NUMBER_CARDS);
      setApiResultsSplited({ [name]: splitedDrinkResponse });
    }
  }
  // função para lidar com os botões de filtro
  async function filterCategory(event, category) {
    if (category === 'all') {
      defaultAPI();
    } else {
      const el = document.querySelector('.selected');
      if (el && el !== event.target) {
        el.className = 'not-selected';
      }
      if (event.target.className !== 'selected') {
        event.target.className = 'selected';
        if (name === 'meals') {
          const foodCategory = await fetchFoodApi(`filter.php?c=${category}`);
          validateMeals(name, foodCategory, setApiResultsSplited, history);
        } else {
          const drinkCategory = await fetchDrinkApi(`filter.php?c=${category}`);
          validateDrinks(name, drinkCategory, setApiResultsSplited, history);
        }
      } else {
        event.target.className = 'not-selected';
        defaultAPI();
      }
    }
  }

  // Redireciona para a pagina de details quando clica em algum card
  function redirectToDetails(idReceita) {
    if (name === 'meals') {
      history.push(`/foods/${idReceita}`);
    } else {
      history.push(`/drinks/${idReceita}`);
    }
  }
  return (
    <div className="searchBar">
      {searchBarShow && (
        <div>
          <input
            name="search-input"
            label="search-input"
            type="text"
            placeholder="Search ..."
            data-testid="search-input"
            onChange={ handleSearch }
            value={ searchInput }
          />
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
            onClick={ searchButton }
          >
            Search
          </button>
        </div>
      )}
      <div className="category-buttons-container">
        <button
          type="button"
          data-testid="All-category-filter"
          className="not-selected category-buttons"
          onClick={ (event) => filterCategory(event, 'all') }
        >
          All
        </button>
        {categories[name].map(({ strCategory }) => (
          <button
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            className="not-selected category-buttons"
            onClick={ (event) => filterCategory(event, strCategory) }
          >
            {strCategory}
          </button>
        ))}
      </div>

      {renderCards(apiResultsSplited, name, redirectToDetails)}
    </div>
  );
}
SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};
export default SearchBar;
