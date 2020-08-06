import React, { useReducer, useEffect, useContext } from "react";
import CollectionReducer from "./collectionReducer";
import CollectionContext from "./collectionContext";
import AuthContext from "../Auth/authContext";
import axios from "axios";

import {
  SET_COLLECTIONS,
  ADD_COLLECTION,
  ADD_RECIPE_TO_COLLECTION,
} from "../types";

const CollectionState = (props) => {
  const initialState = {
    collections: [],
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
        type: SET_COLLECTIONS,
        payload: data.collections,
      });
    }
  };

  useEffect(() => {
    setIntialState(userID);
  }, [user]);

  //   RECIPE BASED FUNCTIONS
  const addCollection = async (collection) => {
    console.log("Adding new collection");
    console.log("collection", collection);
    const res = await axios({
      method: "post",
      url: `/api/${userID}/collections/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { title: collection },
    });

    if (res.data.status === 200) {
      const createdRecipe = res.data.collection;
      dispatch({
        type: ADD_COLLECTION,
        payload: createdRecipe,
      });
    }

    return res.data.status;
  };

  const addRecipeToCollection = async (recipe, collectionID) => {
    console.log(
      "Will attempt to send to",
      `/api/${userID}/collection/${collectionID}`
    );
    const res = await axios({
      method: "post",
      url: `/api/${userID}/collection/${collectionID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { recipeID: recipe._id },
    });

    if (res.data.status === 200) {
      const updatedCollection = res.data.collection;
      dispatch({
        type: ADD_RECIPE_TO_COLLECTION,
        payload: updatedCollection,
      });
    }

    return res.data.status;
  };

  // const deleteRecipeByID = async (id) => {
  //   console.log("CALLING DELETE RECIPE");
  //   const res = await axios.delete(`/api/${userID}/recipe/${id}`);
  //   console.log(res);
  //   if (res.data.status === 200) {
  //     dispatch({
  //       type: DELETE_RECIPE,
  //       payload: id,
  //     });
  //   }
  // };

  // const addRecipeToDay = async ({ recipe, day }) => {
  //   console.log("CALLING ADD RECIPE TO DAY");
  //   console.log(recipe);
  //   console.log(day);
  //   dispatch({
  //     type: ADD_RECIPE_TO_DAY,
  //     payload: { recipe, day },
  //   });
  // };

  // const getRecipeByID = async (id) => {
  //   const res = await axios({
  //     method: "get",
  //     url: `/api/recipe/${id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   return res.data.recipe;
  // };

  // const updateRecipeByID = async (id, recipe) => {
  //   const res = await axios({
  //     method: "patch",
  //     url: `/api/${userID}/recipe/${id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: JSON.stringify(recipe),
  //   });
  //   if (res.data.status === 200) {
  //     dispatch({
  //       type: UPDATE_RECIPE,
  //       payload: res.data.recipe,
  //     });
  //   }
  //   return res.data.status;
  // };

  return (
    <CollectionContext.Provider
      value={{
        collections: state.collections,
        addCollection,
        addRecipeToCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionState;
