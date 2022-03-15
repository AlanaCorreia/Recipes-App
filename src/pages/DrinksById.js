import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchDrinkApi from '../services/fetchApiDrink';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../DetailsPage.css';
import { setStorageFavoriteDrink } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function DrinksById() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeDrink, setRecipeDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkCopy, setCheckCopy] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);

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

  const redirectClick = (idRecipe) => {
    setLocalStorage();
    history.push(`/drinks/${idRecipe}/in`);
  };

  function checkRecipe() {
    const recipeName = recipeDrink.length > 0 ? recipeDrink[0].strDrink : '';
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipeStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    console.log(inProgressStorage);
    if (doneRecipeStorage !== null) {
      const filterDoneRecipe = doneRecipeStorage.filter(({ name }) => (
        name === recipeName));
      console.log(filterDoneRecipe);
      if (filterDoneRecipe.length > 0) {
        return '';
      }
    }

    if (inProgressStorage !== null && inProgressStorage.cocktails[id] !== null) {
      return (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => redirectClick(id) }
          className="button-recipe"
        >
          Continue recipe
        </button>);
    }

    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => redirectClick(id) }
        className="button-recipe"
      >
        Start recipe
      </button>
    );
  }

  function handleClick(idReceita) {
    history.push(`/drinks/${idReceita}`);
  }

  function clipboardCopy(idLink) {
    copy(`http://localhost:3000/drinks/${idLink}`);
    setCheckCopy(true);
  }

  function clickFavorite() {
    setCheckFavorite(!checkFavorite);
    if (checkFavorite) {
      setStorageFavoriteDrink(recipeDrink[0]);
    } removeFavoriteRecipe(id);
  }

  return (
    <div>
      {recipeDrink
        && recipeDrink.map((recipe) => (
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
                <button
                  data-testid="share-btn"
                  type="button"
                  className="icon-button"
                  onClick={ () => clipboardCopy(recipe.idDrink) }
                >
                  <img src={ shareIcon } alt="share Icon" />
                </button>
                <button
                  data-testid="favorite-btn"
                  type="button"
                  className="icon-button"
                  onClick={ clickFavorite }
                >
                  <img
                    src={ checkFavorite
                      ? blackHeartIcon : whiteHeartIcon }
                    alt={ checkFavorite
                      ? 'black Heart Icon"' : 'white Heart Icon' }
                  />
                </button>
              </div>
              { checkCopy && (<p>Link copied!</p>)}
              <p className="category" data-testid="recipe-category">
                {recipe.strCategory}
              </p>
              <h2 className="subtitles-recipe">Ingredients:</h2>
              <ul className="ingredients-list">
                {ingredients.length > 0
                  && measure.length > 0
                  && ingredients.map((element, index) => (
                    <li
                      key={ Math.random() }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      <span>{element[1]}</span>
                      {' - '}
                      {measure[index] !== null && (
                        <span>{measure[index][1]}</span>
                      )}
                    </li>
                  ))}
              </ul>
              <h2 className="subtitles-recipe">Instructions</h2>
              <p data-testid="instructions">{recipe.strInstructions}</p>
              <h2 className="subtitles-recipe">Recommended</h2>
              <div className="recommended-container">
                {mealsRecommendation.map((meal, index) => (
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
                    <p className="recommended-category-text">
                      {meal.strCategory}
                    </p>
                    <p data-testid={ `${index}-recomendation-card` }>
                      {' '}
                      {meal.strMeal}
                    </p>
                  </div>
                ))}
              </div>
              { checkRecipe() }
            </div>
          </div>
        ))}
    </div>
  );
}

export default DrinksById;
