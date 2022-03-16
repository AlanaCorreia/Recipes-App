import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareButton from '../images/shareIcon.svg';
import favoriteButton from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [favoriteRecipesArray, setFavoriteRecipesArray] = useState([]);
  const [fullData, setFullData] = useState();
  const history = useHistory();

  useEffect(() => {
    setFullData(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFavoriteRecipesArray(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  function shareButtonClick(type, id) {
    if (type === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
      setLinkCopied(true);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
      setLinkCopied(true);
    }
  }

  function filterFavoriteRecipes(typeParam) {
    if (typeParam === 'drink') {
      const drinkArray = fullData.filter((element) => element.type === 'drink');
      setFavoriteRecipesArray(drinkArray);
    } else if (typeParam === 'food') {
      const foodArray = fullData.filter((element) => element.type === 'food');
      setFavoriteRecipesArray(foodArray);
    } else {
      setFavoriteRecipesArray(fullData);
    }
  }

  function redirectToDetails(type, id) {
    if (type === 'food') {
      history.push(`foods/${id}`);
    } else {
      history.push(`drinks/${id}`);
    }
  }

  function favoriteButtonClick(id) {
    const newArray = fullData.filter((element) => element.id !== id);
    setFullData(newArray);
    setFavoriteRecipesArray(newArray);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  }

  return (
    <div>
      <div className="header-content">
        <Header name="Favorite Recipes" />
      </div>
      {/* To fix buttons */}
      <div style={ { marginTop: '100px' } }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterFavoriteRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterFavoriteRecipes('food') }

        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavoriteRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      {linkCopied && <p>Link copied!</p>}
      {favoriteRecipesArray && favoriteRecipesArray.map((element, index) => {
        if (element.type === 'food') {
          return (
            <div key={ element.id }>
              <div
              // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
                onClick={ () => redirectToDetails(element.type, element.id) }
                onKeyDown={ redirectToDetails }
                role="button"
                tabIndex={ 0 }
              >
                <img
                  src={ element.image }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-image` }
                  style={ { width: '200px' } }
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {element.name}
                </p>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${element.nationality} - ${element.category}`}
                </p>
              </div>
              <button
                type="button"
                onClick={ () => shareButtonClick(element.type, element.id) }
              >
                <img
                  src={ shareButton }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => favoriteButtonClick(element.id) }
              >
                <img
                  src={ favoriteButton }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          );
        }
        return (
          <div
            key={ element.id }
          >
            <div
            // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
              onClick={ () => redirectToDetails(element.type, element.id) }
              onKeyDown={ redirectToDetails }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ element.image }
                alt={ element.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '200px' } }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {element.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {element.alcoholicOrNot}
              </p>
            </div>
            <button
              type="button"
              onClick={ () => shareButtonClick(element.type, element.id) }
            >
              <img
                src={ shareButton }
                alt={ element.name }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => favoriteButtonClick(element.id) }
            >
              <img
                src={ favoriteButton }
                alt={ element.name }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteRecipes;
