import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_RECIPES,
  ADD_RECIPE_TO_DAY,
  SET_WEEKLY_MEAL_PLAN,
  UPDATE_MEAL_PLAN,
  UPDATE_RECIPE,
} from "../types";

const recipeReducer = (state, action) => {
  console.log("CALLING REDUCER");
  switch (action.type) {
    case SET_RECIPES:
      console.log("CALL SET RECIPES WITH...", action);
      return { ...state, recipes: [...action.payload] };
    case ADD_RECIPE:
      console.log("CALLING ADD RECIPE!");
      console.log(action.payload);
      const newRecipe = action.payload;
      console.log("recipessss: ", [...state.recipes, newRecipe]);
      return { ...state, recipes: [...state.recipes, newRecipe] };
    case UPDATE_RECIPE:
      let filteredRecipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload._id
      );
      filteredRecipes = [...filteredRecipes, action.payload];
      return { ...state, recipes: filteredRecipes };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((r) => r._id !== action.payload),
      };
    case ADD_RECIPE_TO_DAY:
      let { recipe, day } = action.payload;
      let weekly = state.weekly;

      weekly[day] = [...weekly[day], recipe];

      return {
        ...state,
        weekly,
      };
    case SET_WEEKLY_MEAL_PLAN:
      return {
        ...state,
        weekly: action.payload,
      };
    case UPDATE_MEAL_PLAN:
      return {
        ...state,
        weekly: action.payload,
      };
    default:
      return { ...state };
  }
};

export default recipeReducer;
