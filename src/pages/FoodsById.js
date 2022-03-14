import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchFoodApi from '../services/fetchApiFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../DetailsPage.css';

function FoodsById() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const { drinkRecommendation } = useContext(MyContext);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchFoodApi() {
    const resultsApi = await fetchFoodApi(`lookup.php?i=${id}`);
    setRecipeFood(resultsApi.meals);
    const ingredientsReturn = getIngredientsAndMeasure('9', '29', resultsApi.meals);
    setIngredients(ingredientsReturn.filter((element) => element[1] !== ''));
    const measuresReturn = getIngredientsAndMeasure('29', '48', resultsApi.meals);
    setMeasure(measuresReturn.filter((element) => element[1] !== ' '));
  }

  useEffect(() => {
    getFetchFoodApi();
  }, []);

  function getVideo(url) {
    const splitedUrl = url.split('v=')[1];
    const videoUrl = `https://www.youtube.com/embed/${splitedUrl}`;
    return videoUrl;
  }

  function handleClick(idReceita) {
    history.push(`/drinks/${idReceita}`);
  }

  const redirectClick = (idRecipe) => {
    history.push(`/foods/${idRecipe}/in-progress`);
  };

  return (
    <div>
      {recipeFood && recipeFood.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            className="img-recipe"
          />
          <div className="details-container">
            <div className="header-details-container">
              <h1 className="title-recipe" data-testid="recipe-title">
                {recipe.strMeal}
              </h1>
              <button data-testid="share-btn" type="button" className="icon-btn">
                <img src={ shareIcon } alt="share Icon" />
              </button>
              <button data-testid="favorite-btn" type="button" className="icon-btn">
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
            <p data-testid="instructions" className="instructions-text">
              {recipe.strInstructions}
            </p>
            <iframe
              data-testid="video"
              src={ getVideo(recipe.strYoutube) }
              title={ recipe.idMeal }
            />
            <h2 className="subtitles-recipe">Recommended</h2>
            <div className="elements-container">
              { drinkRecommendation.map((drink, index) => (
                <div
                  key={ drink.strDrink }
                  data-testid={ `${index}-recipe-card` }
                  // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
                  onClick={ () => handleClick(drink.idDrink) }
                  onKeyDown={ handleClick }
                  role="button"
                  tabIndex={ 0 }
                  className="element-container"
                >
                  <img
                    className="img-recipe-details"
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <p className="recommended-category-text">{drink.strAlcoholic}</p>
                  <p
                    className="recommended-text"
                    data-testid={ `${index}-recomendation-card` }
                  >
                    {' '}
                    { drink.strDrink }
                  </p>
                </div>
              ))}
            </div>
            <button
              className="button-recipe"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => redirectClick(id) }
            >
              Start recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodsById;
