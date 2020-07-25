import React, { useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";

import { SET_USER, REMOVE_USER } from "../types";

const AuthState = (props) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //   UNSCRAPEABLE WEBSITE BASED FUNCTIONS
  const setUser = async (user) => {
    console.log("Sending Auth Request to Backend");
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const removeUser = async () => dispatch({ type: REMOVE_USER });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        removeUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
