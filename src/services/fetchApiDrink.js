const fetchDrinkApi = async (endpoint) => {
  const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/${endpoint}`);
  const data = await response.json();
  return data;
};

export default fetchDrinkApi;
