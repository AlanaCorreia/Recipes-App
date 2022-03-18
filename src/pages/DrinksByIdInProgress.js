import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { checkRecipeFavorite, removeFavoriteRecipe,
  setStorageFavoriteDrink } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function DrinksByIdInProgress() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const id = pathname.replace(/[^0-9]/g, '');
  const [checkCopy, setCheckCopy] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkDone, setCheckDone] = useState(true);

  /*  function saveIngredients({ target }) {
    if (target.checked === true) {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    } else {
      target.parentNode.className = 'not-selected';
    }
  } */

  function checkIsFavorite() {
    setCheckFavorite(checkRecipeFavorite(id));
  }

  async function getFetchDrinkApi() {
    const resultsApi = await fetchDrinkApi(`lookup.php?i=${id}`);
    setRecipeDrink(resultsApi.drinks);

    const ingredientsReturn = getIngredientsAndMeasure(
      '17',
      '32',
      resultsApi.drinks,
    );
    setIngredients(
      ingredientsReturn.filter(
        (element) => element[0].includes('strIngredient')
              && element[1] !== null
              && element[1] !== '',
      ),
    );
  }

  // Função responsável por atualizar a chave cocktails com novas receitas
  const progressStore = (ingredientsToStore) => {
    // Armazena o valor da chave inProgressRecipes na variável
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!progressStorage.cocktails) {
      // Caso a chave inProgressRecipes exista, mas não tenha a chave cocktails, cria-se a chave cocktails com um objeto vazio
      // e armazena no localStorage
      progressStorage.cocktails = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    } else if (progressStorage.cocktails) {
      progressStorage.cocktails[id] = ingredientsToStore;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    }
    // Se a chave inProgressRecipes e a chave cocktails existirem, cria-se a chave id da receita com o valor dos ingredientes com check
    // e armazena no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
  };

  // Função que seta inicialmente o localStorage
  function getProgressStorageInicial() {
    // Armazena o valor da chave inProgressRecipes na variável
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    // Se a chave inProgressRecipes não existir, cria-se esta chave com o valor cocktails, que recebe um objeto vazio;
    if (inProgressRecipes === null) {
      inProgressRecipes = { cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    // Se a chave cocktails com a chave do id da receita existir, atualiza o estado dos ingredientes com check com os ingredientes salvos no localStorage
    if (inProgressRecipes.cocktails && inProgressRecipes.cocktails[id]) {
      setCheckedIngredients(inProgressRecipes.cocktails[id]);
    }
  }

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

  useEffect(() => {
    getFetchDrinkApi();
    getProgressStorageInicial();
    checkIsFavorite();
  }, []);

  function handleCheckbox({ target }) {
    const ingredient = target.parentNode.innerText;
    let result;

    if (target.checked === true) {
      result = [...checkedIngredients, ingredient];
    } else {
      result = checkedIngredients.filter((checkedIngred) => checkedIngred !== ingredient);
    }

    setCheckedIngredients(result);
    progressStore(result);
  }

  function clipboardCopy(idLink) {
    copy(`http://localhost:3000/drinks/${idLink}`);
    setCheckCopy(true);
  }

  function clickFavorite() {
    if (checkFavorite) {
      setCheckFavorite(false);
      removeFavoriteRecipe(id);
    } else {
      setCheckFavorite(true);
      setStorageFavoriteDrink(recipeDrink[0]);
    }
  }

  function clickButtonFinish() {
    history.push('/done-recipes');
  }

  return (
    <div className="details-page-default">
      { checkCopy && (<p>Link copied!</p>)}
      {recipeDrink.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            className="img-recipe"
          />
          <div className="header-details-container">
            <h1 data-testid="recipe-title" className="title-recipe">
              {recipe.strDrink}
            </h1>
            <div>
              <button
                data-testid="share-btn"
                type="button"
                className="icon-btn"
                onClick={ () => clipboardCopy(recipe.idDrink) }
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
                    checkedIngredients.includes(element[1]) ? 'selected' : 'not-selected'
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
              type="button"
              data-testid="finish-recipe-btn"
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

export default DrinksByIdInProgress;
