import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchIcon from '../components/SearchIcon';
import { MAX_NUMBER_CARDS } from '../services/consts';
import fetchApiArea from '../services/fetchApiArea';
import fecthNacionalitesApi from '../services/fetchApiNacionalites';
import '../ExploreNationalities.css';

function ExploreFoodsNationalities() {
  const [nacionalities, setNacionalities] = useState([]);
  const [selectValue, setSelectValue] = useState('American');
  const [mealsOfArea, setMealsOfArea] = useState([]);

  const history = useHistory();

  // Faz requisição para api com os países e seta no estado nacionalities
  const getFetchNacionalities = async () => {
    const dataNacionalities = await fecthNacionalitesApi();
    const nacionalitiesKeys = dataNacionalities
      .map(({ strArea }) => (strArea));
    setNacionalities(nacionalitiesKeys);
  };

  // Faz requisição das receitas baseadas na nacionalidade.
  // Pega as 12 primeiras receitas e armazena no estado mealsOfArea
  const getFetchArea = useCallback(async () => {
    const areaFoods = await fetchApiArea(selectValue);
    setMealsOfArea(areaFoods.slice(0, MAX_NUMBER_CARDS));
  }, [selectValue]);

  // Lida com valores da Api armazenados no estado mealsOfArea
  // Nos casos não encontrar receita ou se houver apenas 1 receita
  const mealsCondition = useCallback(async () => {
    console.log('checa condition');
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
  useEffect(() => { getFetchArea(); }, [getFetchArea]);

  // Atualiza quando o componente é montado e quando a função é atualizada em razão do mealsOfArea
  useEffect(() => { mealsCondition(); }, [mealsCondition]);

  // Seleção da option seta País no estado selectValue
  function handleChange({ target }) {
    console.log('clicou');
    setSelectValue(target.value);
  }

  // Renderiza os cards de receita
  function renderCards() {
    console.log('renderizou');
    console.log(mealsOfArea);
    if (mealsOfArea.length > 0) {
      return mealsOfArea.map(({ strMeal, strMealThumb }, index) => (
        <div
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
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
