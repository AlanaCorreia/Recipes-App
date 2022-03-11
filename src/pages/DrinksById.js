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
    const ingredientsReturn = getIngredientsAndMeasure('17', '32', resultsApi.drinks);
    setIngredients(ingredientsReturn.filter((element) => element[1] !== null));
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
            {ingredients.length > 0 && measure.length > 0
               && ingredients.map((element, index) => (
                 <li
                   key={ Math.random() }
                   data-testid={ `${index}-ingredient-name-and-measure` }
                 >
                   <p>{element[1]}</p>
                   { measure[index] !== null && <p>{measure[index][1]}</p>}
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
