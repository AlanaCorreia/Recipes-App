import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFoodApi from '../services/fetchApiFood';

function FoodsById() {
  const { location: { pathname } } = useHistory();
  const [recipeFood, setRecipeFood] = useState([]);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchFoodApi() {
    const resultsApi = await fetchFoodApi(`lookup.php?i=${id}`);
    setRecipeFood(resultsApi.meals);
  }

  useEffect(() => {
    getFetchFoodApi();
  }, []);

  console.log(recipeFood);

  return (
    <div>
      {recipeFood !== undefined && recipeFood.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <h1 data-testid="recipe-title">Title Details Food</h1>
          <button data-testid="share-btn" type="button">
            share button
          </button>
          <button data-testid="favorite-btn" type="button">
            favorite button
          </button>
          <p data-testid="recipe-category">category</p>
          <ul>
            <li data-testid={ `${0}-ingredient-name-and-measure` }>Ingredient 1</li>
          </ul>
          <p data-testid="instructions">instructions</p>
          <iframe data-testid="video" title="video" />
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

export default FoodsById;
