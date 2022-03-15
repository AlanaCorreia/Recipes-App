import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';

function DrinksByIdInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const id = pathname.replace(/[^0-9]/g, '');
  async function getFetchDrinkApi() {
    const resultsApi = await fetchDrinkApi(`lookup.php?i=${id}`);
    setRecipeDrink(resultsApi.drinks);
    const ingredientsReturn = getIngredientsAndMeasure('17', '24', resultsApi.drinks);
    setIngredients(ingredientsReturn
      .filter((element) => element[1] !== null && element[1] !== ''));
  }

  console.log(recipeDrink);
  useEffect(() => {
    getFetchDrinkApi();
  }, []);

  return (
    <div>

      { recipeDrink.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <h1 data-testid="recipe-title">{recipe.strDrink}</h1>

          <button type="button" data-testid="share-btn"> compartilhar </button>
          <button type="button" data-testid="favorite-btn"> favoritar </button>

          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <h2>Ingredients:</h2>
          <ul>
            {
              ingredients.map((element, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input type="checkbox" />
                  <span>{element[1]}</span>
                </li>
              ))
            }
          </ul>
          <h2>Category:</h2>

          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>

          <button type="button" data-testid="finish-recipe-btn">Finish</button>

        </div>
      ))}

    </div>
  );
}

export default DrinksByIdInProgress;
