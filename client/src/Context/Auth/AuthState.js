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

  const fetchUser = async () => {
    console.log("CALLING FETCH USER");
    const res = await axios.get("/api/current-user");

    const { user } = res.data;
    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    }
    return;
  };

  const removeUser = async () => dispatch({ type: REMOVE_USER });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        removeUser,
        fetchUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
