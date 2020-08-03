import { ADD_COLLECTION, SET_COLLECTIONS } from "../types";

const collectionReducer = (state, action) => {
  console.log("CALLING COLLECTION REDUCER");
  switch (action.type) {
    case SET_COLLECTIONS:
      console.log("SETTING COLLECTIONS...", action);
      return { ...state, collections: action.payload };
    case ADD_COLLECTION:
      console.log("ADDING COLLECTION...");
      return { ...state, collections: [...state.collections, action.payload] };
    default:
      return { ...state };
  }
};

export default collectionReducer;
