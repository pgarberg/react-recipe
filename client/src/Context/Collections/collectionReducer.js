import {
  ADD_COLLECTION,
  SET_COLLECTIONS,
  ADD_RECIPE_TO_COLLECTION,
  REMOVE_RECIPE_FROM_COLLECTION,
} from "../types";

const collectionReducer = (state, action) => {
  console.log("CALLING COLLECTION REDUCER");
  switch (action.type) {
    case SET_COLLECTIONS:
      console.log("SETTING COLLECTIONS...", action);
      return { ...state, collections: action.payload };
    case ADD_COLLECTION:
      console.log("ADDING COLLECTION...");
      return { ...state, collections: [...state.collections, action.payload] };
    case ADD_RECIPE_TO_COLLECTION:
      return {
        ...state,
        collections: [
          ...state.collections.filter(
            (collection) => collection._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case REMOVE_RECIPE_FROM_COLLECTION:
      return {
        ...state,
        collections: [
          ...state.collections.filter(
            (collection) => collection._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    default:
      return { ...state };
  }
};

export default collectionReducer;
