import { React, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import '../ExploreByIngredient.css';

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
    <div className="container">
      { apiResultsIngredients.map(({ strIngredient }, index) => (
        <div
          className="container-card"
          value={ strIngredient }
          key={ `${strIngredient}-${index}` }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => redirectToPrincipalPage(strIngredient) }
          onKeyDown={ redirectToPrincipalPage }
          role="button"
          tabIndex={ 0 }
        >
          <p className="title-card" data-testid={ `${index}-card-name` }>
            {' '}
            {strIngredient}
          </p>
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
        </div>
      ))}
      ;
    </div>
  ) : (
    <div className="container">
      { apiResultsIngredients.map(({ strIngredient1 }, index) => (
        <div
          className="container-card"
          value={ strIngredient1 }
          key={ `${strIngredient1}-${index}` }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => redirectToPrincipalPage(strIngredient1) }
          onKeyDown={ redirectToPrincipalPage }
          role="button"
          tabIndex={ 0 }
        >
          <p className="title-card" data-testid={ `${index}-card-name` }>
            {' '}
            {strIngredient1}
          </p>
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
          />
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
