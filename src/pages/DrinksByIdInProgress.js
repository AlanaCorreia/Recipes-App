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

    const ingredientsReturn = getIngredientsAndMeasure('17', '32', resultsApi.drinks);
    setIngredients(ingredientsReturn
      .filter((element) => element[0].includes('strIngredient')
      && element[1] !== null && element[1] !== ''));
    console.log(ingredients);
  }

  /* const progressDrinks = {
    cocktails: {
      [id]: ingredients.map((element) => element[1]),
    },
  };
  console.log(progressDrinks);

  function progressStore() {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressDrinks));
    } else {
      localStorage.setItem('inProgressRecipes', { ...progressDrinks.cocktails });
    }
  } */

  useEffect(() => {
    getFetchDrinkApi();
    // progressStore();
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
                  className="not-selected"
                >
                  <input type="checkbox" onClick={ (event) => handleCheckbox(event) } />
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
