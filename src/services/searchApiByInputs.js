import fetchDrinkApi from './fetchApiDrink';
import fetchFoodApi from './fetchApiFood';

async function searchFoods(radioValue, searchInput) {
  if (radioValue === 'ingredient') {
    const result = await fetchFoodApi(`filter.php?i=${searchInput}`);
    return result;
  } if (radioValue === 'name') {
    const result = await fetchFoodApi(`search.php?s=${searchInput}`);
    return result;
  } if (radioValue === 'first-letter') {
    if (searchInput.length <= 1) {
      const result = await fetchFoodApi(`search.php?f=${searchInput}`);
      return result;
    }
    global.alert('Your search must have only 1 (one) character');
  }
}

async function searchDrinks(radioValue, searchInput) {
  if (radioValue === 'ingredient') {
    const result = await fetchDrinkApi(`filter.php?i=${searchInput}`);
    return result;
  } if (radioValue === 'name') {
    const result = await fetchDrinkApi(`search.php?s=${searchInput}`);
    return result;
  } if (radioValue === 'first-letter') {
    if (searchInput.length <= 1) {
      const result = await fetchDrinkApi(`search.php?f=${searchInput}`);
      return result;
    }
    global.alert('Your search must have only 1 (one) character');
  }
}

export { searchFoods, searchDrinks };
