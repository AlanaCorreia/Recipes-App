import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchFoodApi from '../services/fetchApiFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { checkRecipeFavorite, removeFavoriteRecipe,
  setStorageFavoriteFood } from '../helpers/localStorage';
import '../DetailsPage.css';

const copy = require('clipboard-copy');

function FoodsByIdInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkCopy, setCheckCopy] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkDone, setCheckDone] = useState(true);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchFoodApi() {
    const resultsApi = await fetchFoodApi(`lookup.php?i=${id}`);
    setRecipeFood(resultsApi.meals);
    const ingredientsReturn = getIngredientsAndMeasure('9', '29', resultsApi.meals);
    setIngredients(ingredientsReturn
      .filter((element) => element[0].includes('strIngredient')
    && element[1] !== null && element[1] !== ''));
  }

  // Função responsável por atualizar a chave meals com novas receitas
  const progressStore = (ingredientsToStore) => {
    // Armazena o valor da chave inProgressRecipes na variável
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log('entrou na função');

    if (!progressStorage.meals) {
      // Caso a chave inProgressRecipes exista, mas não tenha a chave meals, cria-se a chave meals com um objeto vazio
      // e armazena no localStorage
      progressStorage.meals = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    } else if (progressStorage.meals) {
      progressStorage.meals[id] = ingredientsToStore;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    }
    // else {
    //   progressStorage.meals[id] = ingredientsToStore;
    // }
    // Se a chave inProgressRecipes e a chave meals existirem, cria-se a chave id da receita com o valor dos ingredientes com check
    // e armazena no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
  };

  // Função que seta inicialmente o localStorage
  function getProgressStorageInicial() {
    // Armazena o valor da chave inProgressRecipes na variável
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    // Se a chave inProgressRecipes não existir, cria-se esta chave com o valor meals, que recebe um objeto vazio;
    if (inProgressRecipes === null) {
      inProgressRecipes = { meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    // Se a chave meals com a chave do id da receita existir, atualiza o estado dos ingredientes com check com os ingredientes salvos no localStorage
    if (inProgressRecipes.meals && inProgressRecipes.meals[id]) {
      setCheckedIngredients(inProgressRecipes.meals[id]);
    }
  }

  function checkIsFavorite() {
    setCheckFavorite(checkRecipeFavorite(id));
  }

  useEffect(() => {
    getFetchFoodApi();
    getProgressStorageInicial();
    checkIsFavorite();
  }, []);

  function finishButtonValidate() {
    const checkboxs = document.querySelectorAll('.checkBoxs');
    if (checkboxs.length > 0) {
      const arrayOfCheckeds = [];
      checkboxs.forEach((element) => {
        if (element.checked) {
          arrayOfCheckeds.push(element.checked);
        }
      });
      if (checkboxs.length === arrayOfCheckeds.length) {
        setCheckDone(false);
      }
    }
  }

  useEffect(() => {
    finishButtonValidate();
  }, [checkedIngredients]);

  function handleCheckbox({ target }) {
    console.log('clicou');
    const ingredient = target.parentNode.innerText;
    let result;

    if (target.checked === true) {
      result = [...checkedIngredients, ingredient];
    } else {
      result = checkedIngredients.filter((i) => i !== ingredient);
    }

    setCheckedIngredients(result);
    progressStore(result);
  }

  function clipboardCopy(idLink) {
    copy(`http://localhost:3000/foods/${idLink}`);
    setCheckCopy(true);
  }

  function clickFavorite() {
    if (checkFavorite) {
      setCheckFavorite(false);
      removeFavoriteRecipe(id);
    } else {
      setCheckFavorite(true);
      setStorageFavoriteFood(recipeFood[0]);
    }
  }

  function clickButtonFinish() {
    history.push('/done-recipes');
  }

  return (
    <div className="details-page-default">
      { checkCopy && (<p>Link copied!</p>)}
      {recipeFood.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            className="img-recipe"
          />
          <div className="header-details-container">
            <h1 data-testid="recipe-title" className="title-recipe">
              {recipe.strMeal}
            </h1>
            <div>
              <button
                data-testid="share-btn"
                type="button"
                className="icon-btn"
                onClick={ () => clipboardCopy(recipe.idMeal) }
              >
                <img src={ shareIcon } alt="share Icon" />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={ clickFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ checkFavorite
                    ? blackHeartIcon : whiteHeartIcon }
                  alt={ checkFavorite
                    ? 'black Heart Icon"' : 'white Heart Icon' }
                />
              </button>
            </div>
          </div>
          <div className="details-recipe-container">
            <p data-testid="recipe-category" className="category">
              {recipe.strCategory}
            </p>
            <h2 className="subtitles-recipe">Ingredients:</h2>
            <ul id="ingredientsList" className="ingredients-list">
              {ingredients.map((element, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className={
                    checkedIngredients.includes(element[1])
                      ? 'selected' : 'not-selected'
                  }
                >
                  <input
                    type="checkbox"
                    className="checkBoxs"
                    onClick={ (event) => handleCheckbox(event) }
                    defaultChecked={ checkedIngredients.includes(element[1]) }
                  />
                  <span className="ingredient-text">{element[1]}</span>
                </li>
              ))}
            </ul>
            <h2 className="subtitles-recipe">Instructions</h2>
            <div className="instructions-container">
              <p data-testid="instructions" className="instructions-text">
                {recipe.strInstructions}
              </p>
            </div>
            <button
              className="button-finish-recipe"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ checkDone }
              onClick={ () => clickButtonFinish() }
            >
              Finish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodsByIdInProgress;
