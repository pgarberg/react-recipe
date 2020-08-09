import React, { useReducer, useEffect, useContext } from "react";
import mealplanReducer from "./mealplanReducer";
import MealPlanContext from "./mealplanContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {
  SET_WEEKLY_MEAL_PLAN,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
} from "../types";

const MealPlanState = (props) => {
  const initialState = {
    mealplan: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  };

  const { user } = useContext(AuthContext);

  const userID = user ? user._id : null;

  const [state, dispatch] = useReducer(mealplanReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    const { data } = await axios.get(`/api/${userID}/mealplan`);
    const { mealPlan } = data;
    if (data.status === 200) {
      dispatch({
        type: SET_WEEKLY_MEAL_PLAN,
        payload: mealPlan,
      });
    }
  };

  useEffect(() => {
    setIntialState(userID);
  }, [user]);

  //   MEALPLAN BASED FUNCTIONS
  const addRecipeToMealPlan = async ({ recipe, day }) => {
    console.log("CALLING ADD RECIPE TO DAY");
    console.log(recipe);
    console.log(day);
    console.log("`/api/${userID}/mealplan` :>> ", `/api/${userID}/mealplan`);
    const res = await axios({
      method: "patch",
      url: `/api/${userID}/mealplan`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        recipe,
        dayKey: day,
      },
    });

    if (res.data.status === 200) {
      dispatch({
        type: ADD_RECIPE_TO_DAY,
        payload: { recipe, day },
      });
    }
  };

  const removeRecipeFromMealPlan = async ({ recipeID, day }) => {
    console.log("CALLING REMOVE RECIPE FROM DAY");
    console.log(recipeID);
    console.log(day);

    const res = await axios({
      method: "patch",
      url: `/api/${userID}/mealplan`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        recipeID,
        dayKey: day,
        recipeID,
      },
    });

    if (res.data.status === 200) {
      dispatch({
        type: REMOVE_RECIPE_FROM_DAY,
        payload: { recipeID, day },
      });
    }
  };

  return (
    <MealPlanContext.Provider
      value={{
        mealplan: state.mealplan,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
      }}
    >
      {props.children}
    </MealPlanContext.Provider>
  );
};

export default MealPlanState;
