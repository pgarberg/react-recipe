import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_RECIPES,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  SET_WEEKLY_MEAL_PLAN,
  UPDATE_MEAL_PLAN,
  UPDATE_RECIPE,
  SET_FAVOURITES,
  UPDATE_FAVOURITE,
} from "../types";

const recipeReducer = (state, action) => {
  console.log("CALLING REDUCER");
  switch (action.type) {
    case SET_RECIPES:
      console.log("CALL SET RECIPES WITH...", action);
      return { ...state, recipes: [...action.payload] };
    case SET_FAVOURITES:
      return { ...state, favourites: action.payload };
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
      console.log("filteredRecipes :>> ", filteredRecipes);
      filteredRecipes = [...filteredRecipes, action.payload];
      console.log("filteredRecipes :>> ", filteredRecipes);
      return { ...state, recipes: filteredRecipes };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((r) => r._id !== action.payload),
      };
    case ADD_RECIPE_TO_DAY:
      let { recipe, day } = action.payload;
      let weekly = state.weekly;

      if (weekly[day].length === 5) {
        weekly[day].shift();

        weekly[day].push(recipe);
      } else {
        weekly[day] = [...weekly[day], recipe];
      }

      return {
        ...state,
        weekly,
      };
    case REMOVE_RECIPE_FROM_DAY:
      console.log("CALLING REMOVE RECIPE!");
      let { recipeID } = action.payload;
      let dayKey = action.payload.day;
      let week = state.weekly;

      week[dayKey] = week[dayKey].filter(
        (recipe) => recipe._id.toString() !== recipeID.toString()
      );

      return {
        ...state,
        week,
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
    case UPDATE_FAVOURITE: {
      let filteredRecipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload._id
      );
      console.log("filteredRecipes :>> ", filteredRecipes);
      filteredRecipes = [...filteredRecipes, action.payload];
      console.log("filteredRecipes :>> ", filteredRecipes);
      return { ...state, recipes: filteredRecipes };
    }
    default:
      return { ...state };
  }
};

export default recipeReducer;
