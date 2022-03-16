import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import img from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [doneRecipesArray, setDoneRecipesArray] = useState([]);
  const [fullData, setFullData] = useState();
  const history = useHistory();

  useEffect(() => {
    setFullData(JSON.parse(localStorage.getItem('doneRecipes')));
    setDoneRecipesArray(JSON.parse(localStorage.getItem('doneRecipes')));
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

  function printTags(arrayTags) {
    if (arrayTags.length > 2) {
      return arrayTags.slice(0, 2);
    }
    return arrayTags;
  }

  function filterDoneRecipes(typeParam) {
    if (typeParam === 'drink') {
      const drinkArray = fullData.filter((element) => element.type === 'drink');
      setDoneRecipesArray(drinkArray);
    } else if (typeParam === 'food') {
      const foodArray = fullData.filter((element) => element.type === 'food');
      setDoneRecipesArray(foodArray);
    } else {
      setDoneRecipesArray(fullData);
    }
  }

  function redirectToDetails(type, id) {
    if (type === 'food') {
      history.push(`foods/${id}`);
    } else {
      history.push(`drinks/${id}`);
    }
  }

  return (
    <div>
      <div className="header-content">
        <Header name="Done Recipes" />
      </div>
      {/* To fix buttons */}
      <div style={ { marginTop: '100px' } }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterDoneRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterDoneRecipes('food') }

        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDoneRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      {linkCopied && <p>Link copied!</p>}
      {doneRecipesArray && doneRecipesArray.map((element, index) => {
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
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {element.doneDate}
                </p>
                <ul>
                  {element.tags.length >= 1
                   && printTags(element.tags).map((tagElement) => (
                     <li
                       key={ tagElement }
                       data-testid={ `${index}-${tagElement}-horizontal-tag` }
                     >
                       {tagElement}
                     </li>))}
                </ul>
              </div>
              <button
                type="button"
                onClick={ () => shareButtonClick(element.type, element.id) }
              >
                <img
                  src={ img }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-share-btn` }
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
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {element.doneDate}
              </p>
            </div>
            <button
              type="button"
              onClick={ () => shareButtonClick(element.type, element.id) }
            >
              <img
                src={ img }
                alt={ element.name }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
