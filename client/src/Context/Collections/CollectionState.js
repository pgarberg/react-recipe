import React, { useReducer, useEffect, useContext } from "react";
import CollectionReducer from "./collectionReducer";
import RecipeContext from "./recipeContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {} from "../types";

const RecipesState = (props) => {
  const initialState = {
    collections: [],
    favourites: [],
  };

  const { user } = useContext(AuthContext);

  const userID = user ? user._id : null;

  const [state, dispatch] = useReducer(CollectionReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    console.log("CALLING SET INTITIAL Collection STATE!!");
    const { data } = await axios.get(`/api/${userID}/collections`);
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
    const res = await axios.delete(`/api/${userID}/recipe/${id}`);
    console.log(res);
    if (res.data.status === 200) {
      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
    }
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
