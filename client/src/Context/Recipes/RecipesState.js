import React, { useReducer, useState, useEffect } from "react";
import RecipeReducer from "./recipesReducer";
import RecipeContext from "./recipeContext";
import axios from "axios";

import {
  SET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  ADD_TO_PLANNER,
  ADD_RECIPE_TO_DAY,
  SET_WEEKLY_MEAL_PLAN,
  UPDATE_MEAL_PLAN,
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

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    console.log("CALLING SET INTITIAL STATE!!");
    const { data } = await axios.get(`http://localhost:4000/recipes`);

    dispatch({
      type: SET_RECIPES,
      payload: data,
    });

    const fetchData = await axios.get("http://localhost:4000/mealplan");
    let { mealplan } = fetchData.data;

    dispatch({
      type: SET_WEEKLY_MEAL_PLAN,
      payload: mealplan,
    });

    console.log("FETCH DATA : ", fetchData);
  };

  useEffect(() => {
    setIntialState();
  }, []);

  //   RECIPE BASED FUNCTIONS
  const addRecipe = async (recipe) => {
    console.log("RECIPEEEEEEEEEE", recipe);
    dispatch({
      type: ADD_RECIPE,
      payload: recipe,
    });
  };

  const deleteRecipeByID = async (id) => {
    console.log("CALLING DELETE RECIPE");
    await axios.delete(`http://localhost:4000/recipe/${id}`);
    dispatch({
      type: DELETE_RECIPE,
      payload: id,
    });
  };

  const updateMealPlan = async (mealplan) => {
    console.log("CALLING UPDATE MEAL PLAN", mealplan);

    await axios({
      method: "patch",
      url: "http://localhost:4000/mealplan",
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

  //   Components
  //   const toggleTodoModal = () => {
  //     console.log("DISPATCH MODAL TOGGLE");
  //     dispatch({ type: TOGGLE_TODO_MODAL });
  //   };
  //   const toggleInspectionModal = () => {
  //     dispatch({ type: TOGGLE_INSPECTION_MODAL });
  //   };
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
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipesState;
