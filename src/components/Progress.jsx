import React from 'react';

function Progress() {
  return (
    <div>
      <form>
        <p data-testid="recipe-title">{/* {title} */}</p>
        <img src="" alt="" data-testid="recipe-photo" />
        <button type="button" data-testid="share-btn">{/* compartilhar */}</button>
        <button type="button" data-testid="favorite-btn">{/* favoritar */}</button>

        <div data-testid={ `${index}-ingredient-step` }>
          {' '}
          {/* ingrediente */}
        </div>
        <div data-testid="instructions">
          {' '}
          {/* intrucao */}
        </div>
        <button type="button" data-testid="finish-recipe-btn">{/* finalizar */}</button>
      </form>
    </div>
  );
}
export default Progress;
