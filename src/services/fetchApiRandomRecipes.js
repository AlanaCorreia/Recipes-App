export const getRandomRecipeFood = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const recipe = await response.json();
  return recipe;
};

export const getRandomRecipeDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const recipe = await response.json();
  return recipe;
};
