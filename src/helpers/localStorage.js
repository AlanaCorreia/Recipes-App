const favoriteStorageKey = JSON.parse(localStorage.getItem('favoriteRecipes'));

export function setStorageFavoriteDrink(recipe) {
  const favoriteKey = {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };

  if (favoriteStorageKey === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [favoriteKey],
    ));
  }

  if (favoriteStorageKey) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favoriteStorageKey, favoriteKey],
    ));
  }
}

export function removeFavoriteRecipe(idRecipe) {
  if (favoriteStorageKey) {
    const filterRemoveFavorite = favoriteStorageKey
      .filter((favRecipe) => favRecipe.id !== idRecipe);

    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...filterRemoveFavorite],
    ));
  }
}

export function checkRecipeFavorite(id) {
  if (favoriteStorageKey) {
    const searchFavorite = favoriteStorageKey.find((favorite) => favorite.id === id);
    if (searchFavorite) {
      return true;
    }
  } return false;
}

export function setStorageFavoriteFood(recipe) {
  const favoriteKey = {
    id: recipe.idMeal,
    type: 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };

  if (favoriteStorageKey === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [favoriteKey],
    ));
  }

  if (favoriteStorageKey) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favoriteStorageKey, favoriteKey],
    ));
  }
}
