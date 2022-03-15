export default function getIngredientsAndMeasure(initial, end, recipe) {
  if (recipe[0] !== undefined) {
    const defaultValues = [Object.entries(recipe[0])];
    const slicedArr = defaultValues[0].slice(Number(initial), Number(end));
    return slicedArr;
  }
}
