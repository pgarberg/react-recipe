import React, { useReducer, useEffect, useContext } from "react";
import mealplanReducer from "./mealplanReducer";
import MealPlanContext from "./mealplanContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {
  SET_WEEKLY_MEAL_PLAN,
  SET_USER_SAVED_PLANS,
  ADD_RECIPE_TO_DAY,
  REMOVE_RECIPE_FROM_DAY,
  CLEAR_MEAL_PLAN,
  CREATE_MEAL_PLAN,
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
    savedPlans: [],
  };

  const { user } = useContext(AuthContext);

  const userID = user ? user._id : null;

  const [state, dispatch] = useReducer(mealplanReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    const getInitialUserPlan = async () => {
      const { data } = await axios.get(`/api/${userID}/mealplan`);
      const { mealPlan, status } = data;
      if (status === 200) {
        dispatch({
          type: SET_WEEKLY_MEAL_PLAN,
          payload: mealPlan,
        });
      }
    };

    const getInitialUserSavedPlans = async () => {
      const { data } = await axios.get(`/api/${userID}/savedplans`);
      const { savedPlans, status } = data;
      if (status === 200) {
        dispatch({
          type: SET_USER_SAVED_PLANS,
          payload: savedPlans,
        });
      }
    };
    await getInitialUserPlan();
    await getInitialUserSavedPlans();
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

  const clearMealPlan = async () => {
    const res = await axios({
      method: "delete",
      url: `/api/${userID}/mealplan`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch({
        type: CLEAR_MEAL_PLAN,
        payload: initialState,
      });
    }
  };

  const createMealPlan = async ({ title, mealplan }) => {
    const res = await axios({
      method: "post",
      url: `/api/${userID}/mealplan`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title,
        mealplan,
      },
    });

    const { savedPlans, status } = res.data;

    if (status === 200) {
      dispatch({
        type: CREATE_MEAL_PLAN,
        payload: savedPlans,
      });
    }
  };

  return (
    <MealPlanContext.Provider
      value={{
        mealplan: state.mealplan,
        savedPlans: state.savedPlans,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
        clearMealPlan,
        createMealPlan,
      }}
    >
      {props.children}
    </MealPlanContext.Provider>
  );
};

export default MealPlanState;
