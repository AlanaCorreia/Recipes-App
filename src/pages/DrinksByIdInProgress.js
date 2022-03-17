import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';

function DrinksByIdInProgress() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const id = pathname.replace(/[^0-9]/g, '');

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

    if (progressStorage.cocktails === null) {
      // Caso a chave inProgressRecipes exista, mas não tenha a chave cocktails, cria-se a chave cocktails com um objeto vazio
      // e armazena no localStorage
      progressStorage.cocktails = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    } progressStorage.cocktails[id] = ingredientsToStore;
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
    if (inProgressRecipes.cocktails[id]) {
      setCheckedIngredients(inProgressRecipes.cocktails[id]);
    }
  }

  useEffect(() => {
    getFetchDrinkApi();
    getProgressStorageInicial();
  }, []);

  function handleCheckbox({ target }) {
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
  return (
    <div>
      {recipeDrink.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <h1 data-testid="recipe-title">{recipe.strDrink}</h1>

          <button type="button" data-testid="share-btn">
            {' '}
            compartilhar
            {' '}
          </button>
          <button type="button" data-testid="favorite-btn">
            {' '}
            favoritar
            {' '}
          </button>

          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <h2>Ingredients:</h2>
          <ul id="ingredientsList">
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
                  onClick={ (event) => handleCheckbox(event) }
                  defaultChecked={ checkedIngredients.includes(element[1]) }
                />
                <span>{element[1]}</span>
              </li>
            ))}
          </ul>
          <h2>Category:</h2>

          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>

          <button type="button" data-testid="finish-recipe-btn">
            Finish
          </button>
        </div>
      ))}
    </div>
  );
}

export default DrinksByIdInProgress;
