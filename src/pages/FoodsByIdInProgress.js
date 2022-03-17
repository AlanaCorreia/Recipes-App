import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchFoodApi from '../services/fetchApiFood';

function FoodsByIdInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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

  useEffect(() => {
    getFetchFoodApi();
    getProgressStorageInicial();
  }, []);

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

  return (
    <div>
      {recipeFood.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
          <button type="button" data-testid="share-btn"> compartilhar </button>
          <button type="button" data-testid="favorite-btn"> favoritar </button>
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
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finish</button>
        </div>
      ))}
    </div>
  );
}

export default FoodsByIdInProgress;
