import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';

function RenderCardsIngredients({ name }) {
  const { apiResultsIngredients } = useContext(MyContext);

  return name === 'meals' ? (
    <div>
      { apiResultsIngredients.map(({ strIngredient }, index) => (
        <div
          key={ strIngredient }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>
            {' '}
            {strIngredient}
          </p>
        </div>
      ))}
      ;
    </div>
  ) : (
    <div>
      { apiResultsIngredients.map(({ strIngredient1 }, index) => (
        <div
          key={ strIngredient1 }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
          />
          <p data-testid={ `${index}-card-name` }>
            {' '}
            {strIngredient1}
          </p>
        </div>
      ))}
      ;
    </div>
  );
}

RenderCardsIngredients.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RenderCardsIngredients;
