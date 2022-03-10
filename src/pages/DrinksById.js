import React from 'react';

function DrinksById() {
  const { location: { pathname } } = useHistory();
  const [recipeDrink, setRecipeDrink] = useState([]);

  const id = pathname.replace(/[^0-9]/g, '');

  async function getFetchDrinkApi() {
    const resultsApi = await fetchDrinkApi(`lookup.php?i=${id}`);
    setRecipeDrink(resultsApi.meals);
  }

  useEffect(() => {
    getFetchDrinkApi();
  }, []);

  console.log(recipeDrink);

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="imgTest" />
      <h1 data-testid="recipe-title">Title Details Food</h1>
      <button data-testid="share-btn" type="button">
        share button
      </button>
      <button data-testid="favorite-btn" type="button">
        favorite button
      </button>
      <p data-testid="recipe-category">category</p>
      <ul>
        <li data-testid={ `${0}-ingredient-name-and-measure` }>Ingredient 1</li>
      </ul>
      <p data-testid="instructions">instructions</p>
      <div data-testid={ `${0}-recomendation-card` }>
        <p>recomendação</p>
      </div>
      <button data-testid="start-recipe-btn" type="button">
        Start recipe
      </button>
    </div>
  );
}

export default DrinksById;
