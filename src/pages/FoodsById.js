import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import getIngredientsAndMeasure from '../helpers/getIngredientsAndMeasure';
import fetchFoodApi from '../services/fetchApiFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../DetailsPage.css';
import { checkRecipeFavorite, removeFavoriteRecipe,
  setStorageFavoriteFood } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function FoodsById() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const [checkCopy, setCheckCopy] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);

  const { drinkRecommendation } = useContext(MyContext);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchFoodApi() {
    const resultsApi = await fetchFoodApi(`lookup.php?i=${id}`);
    setRecipeFood(resultsApi.meals);
    const ingredientsReturn = getIngredientsAndMeasure('9', '29', resultsApi.meals);
    setIngredients(ingredientsReturn
      .filter((element) => element[0].includes('strIngredient')
    && element[1] !== null && element[1] !== ''));
    const measuresReturn = getIngredientsAndMeasure('29', '48', resultsApi.meals);
    setMeasure(measuresReturn.filter((element) => element[1] !== ' '));
  }

  function checkIsFavorite() {
    setCheckFavorite(checkRecipeFavorite(id));
  }

  useEffect(() => {
    getFetchFoodApi();

    checkIsFavorite();
  }, []);

  function getVideo(url) {
    const splitedUrl = url.split('v=')[1];
    const videoUrl = `https://www.youtube.com/embed/${splitedUrl}`;
    return videoUrl;
  }

  const redirectClick = (idRecipe) => {
    history.push(`/foods/${idRecipe}/in-progress`);
  };

  function checkRecipe() {
    const recipeName = recipeFood.length > 0 ? recipeFood[0].strMeal : '';
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

    if (inProgressStorage !== null && inProgressStorage.meals[id] !== null) {
      return (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => redirectClick(id) }
          className="button-recipe"
        >
          Continue Recipe
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
    copy(`http://localhost:3000/foods/${idLink}`);
    setCheckCopy(true);
  }

  function clickFavorite() {
    if (checkFavorite) {
      setCheckFavorite(false);
      removeFavoriteRecipe(id);
    } else {
      setCheckFavorite(true);
      console.log('setou', checkFavorite);
      setStorageFavoriteFood(recipeFood[0]);
    }
  }

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
              <button
                data-testid="share-btn"
                type="button"
                className="icon-btn"
                onClick={ () => clipboardCopy(recipe.idMeal) }
              >
                <img src={ shareIcon } alt="share Icon" />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={ clickFavorite }
              >
                <img
                  data-testid="favorite-btn"
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
              {ingredients.length > 0 && measure.length > 0
                  && ingredients.map((element, index) => (
                    <li
                      key={ Math.random() }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      <span>{element[1]}</span>
                      {' '}
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
            <div className="recommended-container">
              { drinkRecommendation.map((drink, index) => (
                <div
                  key={ drink.strDrink }
                  data-testid={ `${index}-recomendation-card` }
                  // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
                  onClick={ () => handleClick(drink.idDrink) }
                  onKeyDown={ handleClick }
                  role="button"
                  tabIndex={ 0 }
                  className="recommended-card"
                >
                  <img
                    className="recommended-img"
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <p className="recommended-category-text">{drink.strAlcoholic}</p>
                  <p
                    className="recommended-text"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {' '}
                    { drink.strDrink }
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
export default FoodsById;
