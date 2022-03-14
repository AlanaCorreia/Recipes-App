import React from 'react';
import Header from '../components/Header';
import Header2 from '../components/Header2';

const doneRecipes = [
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

function DoneRecipes() {
  return (
    <div>
      <div className="header-content">
        <Header name="Done Recipes" />
      </div>
      <Header2 />
      {doneRecipes.map((element, index) => (
        <div key={ element.id }>
          <img
            src={ element.image }
            alt={ element.name }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '200px' } }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {element.category}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {element.name}
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {element.doneDate}
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>
          <ul>
            {element.tags && element.tags.map((tagElement) => (
              <li
                key={ element.id }
                data-testid={ `${index}-${tagElement}-horizontal-tag` }
              >
                {tagElement}
              </li>))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
