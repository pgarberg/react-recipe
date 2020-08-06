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
  SET_FAVOURITES,
  UPDATE_FAVOURITE,
  REMOVE_RECIPE_FROM_DAY,
} from "../types";

const RecipesState = (props) => {
  const initialState = {
    recipes: [],
    favourites: [],
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

    const fetchData = await axios.get(`/api/${userID}/mealplan`);
    let { mealPlan } = fetchData.data;

    console.log("fetchData.data", fetchData.data);
    if (mealPlan) {
      dispatch({
        type: SET_WEEKLY_MEAL_PLAN,
        payload: mealPlan,
      });
    }

    console.log("FETCH DATA : ", fetchData);

    const favourites = await axios.get(`/api/${userID}/recipes/favourites`);

    dispatch({
      type: SET_FAVOURITES,
      payload: favourites.data.favourites,
    });
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
    const res = await axios.delete(`/api/${userID}/recipe/${id}`);
    console.log(res);
    if (res.data.status === 200) {
      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
    }
  };

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
      url: `/api/${userID}/recipe/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(recipe),
    });
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data.recipe,
      });
    }
    return res.data.status;
  };

  const updateRecipeFavourite = async (id, recipe) => {
    console.log("CALL UPDATE FAVE");
    const res = await axios.get(`/api/${userID}/recipe/${id}/favourite`);

    console.log("res", res);
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_FAVOURITE,
        payload: res.data.recipe,
      });
    }

    return res.data.status;
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        weekly: state.weekly,
        favourites: state.favourites,
        addRecipe,
        setIntialState,
        deleteRecipeByID,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
        getRecipeByID,
        updateRecipeByID,
        updateRecipeFavourite,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipesState;
