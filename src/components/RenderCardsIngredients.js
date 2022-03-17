import { React, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';

function RenderCardsIngredients({ name }) {
  const { apiResultsIngredients } = useContext(MyContext);
  const { setIngredientsFilterKey } = useContext(MyContext);
  const { setRadioValue } = useContext(MyContext);
  const { setsearchInput } = useContext(MyContext);
  const history = useHistory();

  const redirectToPrincipalPage = (ingredient) => {
    if (name === 'meals') {
      setIngredientsFilterKey(true);
      setsearchInput(ingredient);
      setRadioValue('ingredient');
      history.push('/foods');
    } else {
      setIngredientsFilterKey(true);
      setsearchInput(ingredient);
      setRadioValue('ingredient');
      history.push('/drinks');
    }
  };

  return apiResultsIngredients.length > 0 && name === 'meals' ? (
    <div>
      { apiResultsIngredients.map(({ strIngredient }, index) => (
        <div
          value={ strIngredient }
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => redirectToPrincipalPage(strIngredient) }
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
      { console.log(apiResultsIngredients) }
      { apiResultsIngredients.length > 0 && name === 'drinks' ? (
        apiResultsIngredients.map(({ strIngredient1 }, index) => (
          <div
            value={ strIngredient1 }
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => redirectToPrincipalPage(strIngredient1) }
            onKeyDown={ redirectToPrincipalPage }
            role="button"
            tabIndex={ 0 }
          >
            <img
              style={ { width: '300px' } }
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            { console.log(strIngredient1) }
            <p data-testid={ `${index}-card-name` }>
              {' '}
              {strIngredient1}
            </p>
          </div>
        ))) : (console.error('erro'))}
      ;
    </div>
  );
}

RenderCardsIngredients.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RenderCardsIngredients;
