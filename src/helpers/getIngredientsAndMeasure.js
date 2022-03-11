export default function getIngredientsAndMeasure(initial, end, recipe) {
  if (recipe[0] !== undefined) {
    const defaultValues = [Object.entries(recipe[0])];
    const slicedArr = defaultValues[0].slice(Number(initial), Number(end));
    const defaultArr = slicedArr.filter((elem) => (elem[1] !== null));
    return defaultArr;
  }
}
