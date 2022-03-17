import { React, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderCardsIngredients from '../components/RenderCardsIngredients';
import MyContext from '../context/myContext';
import { DEFAULT_URL_API_INGREDIENTS, MAX_NUMBER_CARDS } from '../services/consts';
import fetchDrinkApi from '../services/fetchApiDrink';

function ExploreDrinksIngredients() {
  const { setApiResultsIngredients } = useContext(MyContext);

  useEffect(() => {
    const searchIngredient = async () => {
      const allIngredients = await fetchDrinkApi(DEFAULT_URL_API_INGREDIENTS);
      const { drinks } = allIngredients;
      const sliceResponse = drinks.slice(0, MAX_NUMBER_CARDS);
      setApiResultsIngredients(sliceResponse);
    };
    searchIngredient();
  }, []);

  return (
    <div>
      <div className="header-content">
        <Header name="Explore Ingredients" />
      </div>
      <RenderCardsIngredients name="drinks" />
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
