import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../DetailsPage.css';

function DrinksById() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const { mealsRecommendation } = useContext(MyContext);

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

  function handleClick(idReceita) {
    history.push(`/drinks/${idReceita}`);
  }

  const redirectClick = (idRecipe) => {
    history.push(`/drinks/${idRecipe}/in-progress`);
  };

  return (
    <div>
      {recipeDrink && recipeDrink.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            className="img-recipe"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <div className="details-container">
            <div className="header-details-container">
              <h1 className="title-recipe-drink" data-testid="recipe-title">
                {recipe.strDrink}
              </h1>
              <button data-testid="share-btn" type="button" className="icon-button">
                <img src={ shareIcon } alt="share Icon" />
              </button>
              <button data-testid="favorite-btn" type="button" className="icon-button">
                <img src={ whiteHeartIcon } alt="white Heart Icon" />
              </button>
            </div>
            <p className="category" data-testid="recipe-category">
              {recipe.strCategory}
            </p>
            <h2 className="subtitles-recipe">Ingredients:</h2>
            <ul className="ingredients-list">
              {ingredients.length > 0 && measure.length > 0
                && ingredients.map((element, index) => (
                  <li
                    key={ Math.random() }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <span>{element[1]}</span>
                    {' - '}
                    { measure[index] !== null && <span>{measure[index][1]}</span>}
                  </li>
                ))}
            </ul>
            <h2 className="subtitles-recipe">Instructions</h2>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <h2 className="subtitles-recipe">Recommended</h2>
            <div className="recommended-container">
              { mealsRecommendation.map((meal, index) => (
                <div
                  key={ meal.strMeal }
                  data-testid={ `${index}-recomendation-card` }
                  // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
                  onClick={ () => handleClick(meal.idMeal) }
                  onKeyDown={ handleClick }
                  role="button"
                  tabIndex={ 0 }
                >
                  <img
                    style={ { width: '150px' } }
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <p className="recommended-category-text">{meal.strCategory}</p>
                  <p data-testid={ `${index}-recomendation-card` }>
                    {' '}
                    { meal.strMeal }
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => redirectClick(id) }
              className="button-recipe"
            >
              Start recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DrinksById;
