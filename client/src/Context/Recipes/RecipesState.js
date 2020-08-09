import React, { useReducer, useEffect, useContext } from "react";
import RecipeReducer from "./recipesReducer";
import RecipeContext from "./recipeContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {
  SET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  SET_FAVOURITES,
  UPDATE_FAVOURITE,
} from "../types";

const RecipesState = (props) => {
  const initialState = {
    recipes: [],
    favourites: [],
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

    const res = await axios.get(`/api/${userID}/recipes/favourites`);
    const { favourites } = res.data;
    dispatch({
      type: SET_FAVOURITES,
      payload: favourites,
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

        favourites: state.favourites,
        addRecipe,
        setIntialState,
        deleteRecipeByID,
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
