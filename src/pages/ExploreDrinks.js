import React from 'react';
import { useHistory } from 'react-router-dom';
import '../exploreDrinks.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomRecipeDrink } from '../services/fetchApiRandomRecipes';

function ExploreDrinks() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  function redirectToDetails(id) {
    history.push(`/drinks/${id}`);
  }

  const renderRandomDrink = async () => {
    const randomDrink = await getRandomRecipeDrink();
    const { drinks } = randomDrink;
    const id = drinks[0].idDrink;
    redirectToDetails(id);
  };

  return (
    <div>
      <div className="header-content">
        <Header name="Explore Drinks" />
      </div>
      <div className="contentExplore">
        <button
          className="buttonsExplore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => handleClick('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="buttonsExplore"
          data-testid="explore-surprise"
          onClick={ () => renderRandomDrink() }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
