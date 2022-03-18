import { React, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';

function RenderCardsIngredients({ name }) {
  const { apiResultsIngredients } = useContext(MyContext);
  const { setRadioValue } = useContext(MyContext);
  const history = useHistory();

  const redirectToPrincipalPage = (ingredient, route) => {
    setRadioValue(ingredient);
    history.push(route);
  };

  return name === 'meals' ? (
    <div>
      { apiResultsIngredients.map(({ strIngredient }, index) => (
        <div
          value={ strIngredient }
          key={ `${strIngredient}-${index}` }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => redirectToPrincipalPage(strIngredient, '/foods') }
          onKeyDown={ redirectToPrincipalPage }
          role="button"
          tabIndex={ 0 }
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
          value={ strIngredient1 }
          key={ `${strIngredient1}-${index}` }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => redirectToPrincipalPage(strIngredient1, '/drinks') }
          onKeyDown={ redirectToPrincipalPage }
          role="button"
          tabIndex={ 0 }
        >
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
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
