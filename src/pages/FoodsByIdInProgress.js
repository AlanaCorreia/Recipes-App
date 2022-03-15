import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchFoodApi from '../services/fetchApiFood';

function FoodsByIdInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchFoodApi() {
    const resultsApi = await fetchFoodApi(`lookup.php?i=${id}`);
    setRecipeFood(resultsApi.meals);
    const ingredientsReturn = getIngredientsAndMeasure('9', '29', resultsApi.meals);
    setIngredients(ingredientsReturn
      .filter((element) => element[0].includes('strIngredient')
    && element[1] !== null && element[1] !== ''));
  }

  useEffect(() => {
    getFetchFoodApi();
  }, []);

  function handleCheckbox({ target }) {
    console.log(target.parentNode);
    if (target.checked === true) {
      target.parentNode.className = 'selected';
    } else {
      target.parentNode.className = 'not-selected';
    }
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
          <ul>
            {ingredients.length > 0
              && ingredients.map((element, index) => (
                <li
                  key={ Math.random() }
                  data-testid={ `${index}-ingredient-step` }
                  className="not-selected"
                >
                  <input
                    type="checkbox"
                    onClick={ (event) => handleCheckbox(event) }
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
