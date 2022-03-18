import { React } from 'react';
import { useHistory } from 'react-router-dom';
import '../ExploreFoods.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { DEFAULT_URL_API_RANDOM } from '../services/consts';
import fetchFoodApi from '../services/fetchApiFood';

function ExploreFoods() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  const redirectToDetails = (id) => {
    history.push(`/foods/${id}`);
  };

  const renderRandomFood = async () => {
    const randomFood = await fetchFoodApi(DEFAULT_URL_API_RANDOM);
    const { meals } = randomFood;
    const id = meals[0].idMeal;
    redirectToDetails(id);
  };

  return (
    <div>
      <div className="header-content">
        <Header name="Explore Foods" />
      </div>
      <div className="contentExplore">
        <button
          className="buttonsExplore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => handleClick('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          className="buttonsExplore"
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => handleClick('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          className="buttonsExplore"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => renderRandomFood() }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
