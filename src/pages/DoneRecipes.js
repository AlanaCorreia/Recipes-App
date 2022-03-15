import React, { useState } from 'react';
import img from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const doneRecipesArray = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

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

  return (
    <div>
      <div className="header-content">
        <Header name="Done Recipes" />
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={ () => filterDoneRecipes('all', doneRecipesArray, setDoneRecipesArray) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          // onClick={ () => filterDoneRecipes('foods', doneRecipesArray, setDoneRecipesArray) }

        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ () => filterDoneRecipes('drinks', doneRecipesArray, setDoneRecipesArray) }
        >
          Drinks
        </button>
      </div>
      {linkCopied && <p>Link copied!</p>}
      {doneRecipesArray.map((element, index) => {
        if (element.type === 'food') {
          return (
            <div key={ element.id }>
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
                {element.tags.length >= 1 && printTags(element.tags).map((tagElement) => (
                  <li
                    key={ tagElement }
                    data-testid={ `${index}-${tagElement}-horizontal-tag` }
                  >
                    {tagElement}
                  </li>))}
              </ul>
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
          <div key={ element.id }>
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
