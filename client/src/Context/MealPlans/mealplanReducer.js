import {
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  SET_WEEKLY_MEAL_PLAN,
  SET_USER_SAVED_PLANS,
  UPDATE_MEAL_PLAN,
  CLEAR_MEAL_PLAN,
  CREATE_MEAL_PLAN,
} from "../types";

const mealplanReducer = (state, action) => {
  console.log("CALLING MEALPLAN REDUCER");
  switch (action.type) {
    case SET_WEEKLY_MEAL_PLAN:
      return {
        ...state,
        mealplan: action.payload,
      };
    case SET_USER_SAVED_PLANS:
      return { ...state, savedPlans: action.payload };
    case CREATE_MEAL_PLAN:
      return {
        ...state,
        savedPlans: [...state.savedPlans, action.payload],
      };
    case UPDATE_MEAL_PLAN:
      return {
        ...state,
        mealplan: action.payload,
      };
    case ADD_RECIPE_TO_DAY:
      let { recipe, day } = action.payload;
      let mealplan = state.mealplan;

      if (mealplan[day].length === 5) {
        mealplan[day].shift();

        mealplan[day].push(recipe);
      } else {
        mealplan[day] = [...mealplan[day], recipe];
      }

      return {
        ...state,
        mealplan,
      };
    case REMOVE_RECIPE_FROM_DAY:
      console.log("CALLING REMOVE RECIPE!");
      let { recipeID } = action.payload;
      let dayKey = action.payload.day;
      let week = state.mealplan;

      week[dayKey] = week[dayKey].filter(
        (recipe) => recipe._id.toString() !== recipeID.toString()
      );

      return {
        ...state,
        week,
      };
    case CLEAR_MEAL_PLAN:
      console.log("CALLING CLEAR MEAL PLAN!");
      return { ...state, mealplan: action.payload.mealplan };
    default:
      return { ...state };
  }
};

export default mealplanReducer;
