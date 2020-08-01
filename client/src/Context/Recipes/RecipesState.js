import React, { useReducer, useEffect, useContext } from "react";
import RecipeReducer from "./recipesReducer";
import RecipeContext from "./recipeContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {
  SET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  ADD_RECIPE_TO_DAY,
  SET_WEEKLY_MEAL_PLAN,
  UPDATE_MEAL_PLAN,
  UPDATE_RECIPE,
} from "../types";

const RecipesState = (props) => {
  const initialState = {
    recipes: [],
    weekly: {
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

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    console.log("CALLING SET INTITIAL RECIPE STATE!!");
    const { data } = await axios.get(`/api/${userID}/recipes`);
    console.log("data", data);
    if (data.status === 200) {
      dispatch({
        type: SET_RECIPES,
        payload: data.recipes,
      });
    }

    const fetchData = await axios.get("/api/mealplan");
    let { mealplan } = fetchData.data;

    dispatch({
      type: SET_WEEKLY_MEAL_PLAN,
      payload: mealplan,
    });

    console.log("FETCH DATA : ", fetchData);
  };

  useEffect(() => {
    setIntialState(userID);
  }, [user]);

  //   RECIPE BASED FUNCTIONS
  const addRecipe = async (recipe) => {
    console.log("RECIPEEEEEEEEEE", recipe);
    const res = await axios({
      method: "post",
      url: `/api/${userID}/recipe/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        recipe,
      },
    });

    if (res.data.status === 200) {
      const createdRecipe = res.data.recipe;
      dispatch({
        type: ADD_RECIPE,
        payload: createdRecipe,
      });
    }

    return res.data.status;
  };

  const deleteRecipeByID = async (id) => {
    console.log("CALLING DELETE RECIPE");
    await axios.delete(`/api/recipe/${id}`);
    dispatch({
      type: DELETE_RECIPE,
      payload: id,
    });
  };

  const updateMealPlan = async (mealplan) => {
    console.log("CALLING UPDATE MEAL PLAN", mealplan);

    await axios({
      method: "patch",
      url: "/api/mealplan",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        mealplan,
      },
    });
    dispatch({
      type: UPDATE_MEAL_PLAN,
      payload: mealplan,
    });
  };

  const addRecipeToDay = async ({ recipe, day }) => {
    console.log("CALLING ADD RECIPE TO DAY");
    console.log(recipe);
    console.log(day);
    dispatch({
      type: ADD_RECIPE_TO_DAY,
      payload: { recipe, day },
    });
  };

  const getRecipeByID = async (id) => {
    const res = await axios({
      method: "get",
      url: `/api/recipe/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.recipe;
  };

  const updateRecipeByID = async (id, recipe) => {
    const res = await axios({
      method: "patch",
      url: `/api/recipe/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(recipe),
    });

    dispatch({
      type: UPDATE_RECIPE,
      payload: res.data.recipe,
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        weekly: state.weekly,
        addRecipe,
        setIntialState,
        deleteRecipeByID,
        addRecipeToDay,
        updateMealPlan,
        getRecipeByID,
        updateRecipeByID,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipesState;
