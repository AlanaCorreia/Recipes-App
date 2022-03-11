import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';

function DrinksById() {
  const { location: { pathname } } = useHistory();
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchDrinkApi() {
    const resultsApi = await fetchDrinkApi(`lookup.php?i=${id}`);
    setRecipeDrink(resultsApi.drinks);
    setIngredients(getIngredientsAndMeasure('17', '32', resultsApi.drinks));
    setMeasure(getIngredientsAndMeasure('32', '47', resultsApi.drinks));
  }

  useEffect(() => {
    getFetchDrinkApi();
  }, []);

  return (
    <div>
      {recipeDrink && recipeDrink.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
          <button data-testid="share-btn" type="button">
            share button
          </button>
          <button data-testid="favorite-btn" type="button">
            favorite button
          </button>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <ul>
            {console.log(ingredients)}
            {console.log('ingredients[0]:', ingredients[0])}
            {ingredients && ingredients.map((ingred, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                { ingred[1] }
                {' '}
                { measure[index][1]}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">instructions</p>
          <div data-testid={ `${0}-recomendation-card` }>
            <p>recomendação</p>
          </div>
          <button data-testid="start-recipe-btn" type="button">
            Start recipe
          </button>
        </div>
      ))}
    </div>
  );
}

export default DrinksById;
