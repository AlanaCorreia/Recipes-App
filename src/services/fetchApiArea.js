const fetchApiArea = async (nacionality) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nacionality}`);
    const data = await response.json();
    const results = data.meals;
    return results;
  } catch (error) {
    return error;
  }
};

export default fetchApiArea;
