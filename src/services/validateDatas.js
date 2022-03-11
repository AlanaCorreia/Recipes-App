import { MAX_NUMBER_CARDS } from './consts';

// Recebe os valores da API de foods e lida com esses valores.
async function mealsCondition(name, dataFoodToValidate, setApiResultsSplited, history) {
  if (dataFoodToValidate !== undefined) {
    if (dataFoodToValidate.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (dataFoodToValidate.meals.length === 1) {
      history.push(`/foods/${dataFoodToValidate.meals[0].idMeal}`);
    } else if (dataFoodToValidate.meals.length >= MAX_NUMBER_CARDS) {
      const splitedArray = dataFoodToValidate[name].slice(0, MAX_NUMBER_CARDS);
      setApiResultsSplited({ [name]: splitedArray });
    } else {
      setApiResultsSplited({ [name]: dataFoodToValidate.meals });
    }
  }
}

// Recebe os valores da API de drinks e lida com esses valores.
async function drinkCondition(name, dataDrinkToValidate, setApiResultsSplited, history) {
  if (dataDrinkToValidate !== undefined) {
    if (dataDrinkToValidate.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (dataDrinkToValidate.drinks.length === 1) {
      history.push(`/drinks/${dataDrinkToValidate.drinks[0].idDrink}`);
    } else if (dataDrinkToValidate.drinks.length >= MAX_NUMBER_CARDS) {
      const splitedArray = dataDrinkToValidate[name].slice(0, MAX_NUMBER_CARDS);
      setApiResultsSplited({ [name]: splitedArray });
    } else {
      setApiResultsSplited({ [name]: dataDrinkToValidate.meals });
    }
  }
}

export { mealsCondition, drinkCondition };
