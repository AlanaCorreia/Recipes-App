import React, { useState, useEffect, useCallback } from 'react';
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
  const id = pathname.replace(/[^0-9]/g, '');
  const [usedIngredients, setUsedIngredients] = useState([]);

  /*  function saveIngredients({ target }) {
    if (target.checked === true) {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    } else {
      target.parentNode.className = 'not-selected';
    }
  } */

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
  // Só será renderizada novamente caso haja alguma atualização no id ou nos ingredientes
  // https://developerplus.com.br/hook-usecallback-no-react-native
  const progressStore = useCallback(
    () => {
      // Se o estado dos ingredientes vier vazio, a função não retorna nada
      if (ingredients.length === 0) {
        return;
      }

      // Armazena o valor da chave inProgressRecipes na variável
      const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

      // Se a chave cocktails existir, mas a chave com o id da receita não existe, cria-se a chave id com o valor dos ingredientes
      if (progressStorage.cocktails && !progressStorage.cocktails[id]) {
        progressStorage.cocktails[id] = ingredients.map((element) => element[1]);
        localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
      }
    },
    [id, ingredients],
  );

  // Função que seta inicialmente o localStorage
  function setProgressStorageInicial() {
    // Armazena o valor da chave inProgressRecipes na variável
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Se a chave não existir, cria-se a chave inProgressRecipes e armazena a chave cocktails dentro dela com um objeto vazio
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {} }));
    } else if (!inProgressRecipes.cocktails) {
      // Caso a chave inProgressRecipes exista, mas não tenha a chave cocktails, cria-se a chave cocktails com um objeto vazio
      // e armazena no localStorage
      inProgressRecipes.cocktails = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  useEffect(() => {
    getFetchDrinkApi();
    setProgressStorageInicial();
  }, []);

  // A função ProgressStore só vai ser chamada se ela for atualizada
  useEffect(() => {
    progressStore();
  }, [progressStore]);

  function handleCheckbox({ target }) {
    if (target.checked === true) {
      target.parentNode.className = 'selected';

      setUsedIngredients(
        () => {
          if (localStorage.getItem('inProgressRecipes')) {
            const inProgressRecipes = JSON
              .parse(localStorage.getItem('inProgressRecipes'));
            if (inProgressRecipes && recipe.idDrink in inProgressRecipes.drinks) {
              const { drinks } = inProgressRecipes;
              return drinks[recipe.idDrink];
            }
            return [];
          }
        },
      );
    } else {
      target.parentNode.className = 'not-selected';
    }
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
                className="not-selected"
              >
                <input
                  checked={}
                  type="checkbox"
                  onClick={ (event) => handleCheckbox(event) }
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
