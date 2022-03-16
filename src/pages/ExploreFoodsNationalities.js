import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchIcon from '../components/SearchIcon';
import { DEFAULT_URL_API, MAX_NUMBER_CARDS } from '../services/consts';
import fetchApiArea from '../services/fetchApiArea';
import fecthNacionalitesApi from '../services/fetchApiNacionalites';
import '../ExploreNationalities.css';
import fetchFoodApi from '../services/fetchApiFood';

function ExploreFoodsNationalities() {
  const [nacionalities, setNacionalities] = useState(['All']);
  const [selectValue, setSelectValue] = useState('All');
  const [mealsOfArea, setMealsOfArea] = useState([]);
  // const [allFoods, setAllFoods] = useState([]);

  const history = useHistory();

  // Faz requisição para api com os países e seta no estado nacionalities
  const getFetchNacionalities = async () => {
    const dataNacionalities = await fecthNacionalitesApi();
    const nacionalitiesKeys = dataNacionalities
      .map(({ strArea }) => (strArea));
    setNacionalities([...nacionalities, ...nacionalitiesKeys]);
  };

  const defaultAPI = async () => {
    const foodDefault = await fetchFoodApi(DEFAULT_URL_API);
    const sliceFoodDefault = foodDefault.meals.slice(0, MAX_NUMBER_CARDS);
    setMealsOfArea(sliceFoodDefault);
  };

  // Faz requisição das receitas baseadas na nacionalidade.
  // Pega as 12 primeiras receitas e armazena no estado mealsOfArea
  const getFetchArea = async () => {
    const areaFoods = await fetchApiArea(selectValue);
    if (areaFoods === null) {
      return;
    }
    setMealsOfArea(areaFoods.slice(0, MAX_NUMBER_CARDS));
  };

  // Lida com valores da Api armazenados no estado mealsOfArea
  // Nos casos não encontrar receita ou se houver apenas 1 receita
  const mealsCondition = useCallback(async () => {
    if (mealsOfArea !== undefined) {
      if (mealsOfArea === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (mealsOfArea.length === 1) {
        history.push(`/foods/${mealsOfArea[0].idMeal}`);
      }
    }
  }, [mealsOfArea, history]);

  // Atualiza quando o componente é montado
  useEffect(() => { getFetchNacionalities(); }, []);

  // Atualiza quando o componente é montado e quando a função é atualizada em razão do selectValue
  // useEffect(() => { getFetchArea(); }, [getFetchArea]);

  useEffect(() => {
    if (selectValue === 'All') {
      defaultAPI();
    } getFetchArea();
  }, [selectValue]);

  // Atualiza quando o componente é montado e quando a função é atualizada em razão do mealsOfArea
  useEffect(() => { mealsCondition(); }, [mealsCondition]);

  // Seleção da option seta País no estado selectValue
  function handleChange({ target }) {
    setSelectValue(target.value);
  }

  function redirectToDetails(idReceita) {
    history.push(`/foods/${idReceita}`);
  }

  // Renderiza os cards de receita
  function renderCards() {
    if (mealsOfArea.length > 0) {
      return mealsOfArea.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <div
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => redirectToDetails(idMeal) }
          onKeyDown={ redirectToDetails }
          role="button"
          tabIndex={ 0 }
          className="containerFood"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
            className="thumbFood"
          />
          <p data-testid={ `${index}-card-name` } className="titleFood">
            {' '}
            { strMeal }
          </p>
        </div>
      ));
    }
  }

  return (
    <div>
      <header className="header-content">
        <Header name="Explore Nationalities" />
        <SearchIcon />
      </header>
      <select
        name="nacionalities"
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChange }
        className="select-dropbox"
      >
        { nacionalities.map((nacionality, index) => (
          <option
            key={ index }
            data-testid={ `${nacionality}-option` }
            value={ nacionality }
          >
            {nacionality}
          </option>
        ))}
      </select>
      <div className="containerExhibition">
        { renderCards() }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
