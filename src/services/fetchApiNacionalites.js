const fecthNacionalitesApi = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    const results = data.meals;
    return results;
  } catch (error) {
    return error;
  }
};

export default fecthNacionalitesApi;
