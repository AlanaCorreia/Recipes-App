const fetchFoodApi = async (endpoint) => {
  const response = await fetch(`www.themealdb.com/api/json/v1/1/${endpoint}`);
  const data = await response.json();
  return data;
};

export default fetchFoodApi;
