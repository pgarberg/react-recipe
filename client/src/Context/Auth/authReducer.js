import { SET_USER, REMOVE_USER } from "../types";

const authReducer = (state, action) => {
  console.log("CALLING AUTH REDUCER");
  switch (action.type) {
    case SET_USER:
      console.log("SETTING USER...", action);
      return { ...state, user: action.payload };
    case REMOVE_USER:
      console.log("REMOVING USER...");
      return { ...state, user: null };
    default:
      return { ...state };
  }
};

export default authReducer;
