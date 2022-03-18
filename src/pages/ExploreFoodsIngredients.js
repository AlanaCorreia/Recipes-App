import { React, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderCardsIngredients from '../components/RenderCardsIngredients';
import MyContext from '../context/myContext';
import '../ExploreFoodsIngredients.css';
import { DEFAULT_URL_API_INGREDIENTS, MAX_NUMBER_CARDS } from '../services/consts';
import fetchFoodApi from '../services/fetchApiFood';

function ExploreFoodsIngredients() {
  const { setApiResultsIngredients } = useContext(MyContext);

  useEffect(() => {
    const searchIngredient = async () => {
      const allIngredients = await fetchFoodApi(DEFAULT_URL_API_INGREDIENTS);
      const { meals } = allIngredients;
      const sliceResponse = meals.slice(0, MAX_NUMBER_CARDS);
      setApiResultsIngredients(sliceResponse);
    };
    searchIngredient();
  }, []);

  return (
    <div>
      <div className="header-content">
        <Header name="Explore Ingredients" />
      </div>
      <RenderCardsIngredients name="meals" />
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
