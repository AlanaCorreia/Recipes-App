import React from 'react';
// Renderiza os Cards de foods/drinks na tela.
function renderCards(apiResultsSplited, name, redirectToDetails) {
  return apiResultsSplited[name].length > 0 && name === 'meals' ? (
    apiResultsSplited[name].map(({ idMeal, strMeal, strMealThumb }, index) => (
      <div
        key={ strMeal }
        data-testid={ `${index}-recipe-card` }
        // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
        onClick={ () => redirectToDetails(idMeal) }
        onKeyDown={ redirectToDetails }
        role="button"
        tabIndex={ 0 }
      >
        <img
          style={ { width: '300px' } }
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <p data-testid={ `${index}-card-name` }>
          {' '}
          { strMeal }
        </p>
      </div>
    ))
  ) : (
    apiResultsSplited[name].map(({ idDrink, strDrink, strDrinkThumb }, index) => (
      <div
        key={ strDrink }
        data-testid={ `${index}-recipe-card` }
        // link referencia: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
        onClick={ () => redirectToDetails(idDrink) }
        onKeyDown={ redirectToDetails }
        role="button"
        tabIndex={ 0 }
      >
        <img
          style={ { width: '300px' } }
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <p data-testid={ `${index}-card-name` }>
          {' '}
          { strDrink }
        </p>
      </div>
    ))
  );
}
export default renderCards;
