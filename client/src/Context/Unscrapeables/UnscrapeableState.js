import React, { useReducer, useEffect } from "react";
import UnscrapeableReducer from "./unscrapeableReducer";
import UnscrapeableContext from "./unscrapeableContext";
import axios from "axios";

import {
  SET_UNSCRAPEABLES,
  ADD_UNSCRAPEABLE,
  DELETE_UNSCRAPEABLE,
} from "../types";

const UnscrapeableState = (props) => {
  const initialState = {
    sites: [],
  };

  const [state, dispatch] = useReducer(UnscrapeableReducer, initialState);

  //SET INITIAL STATE
  const setIntialState = async () => {
    const { data } = await axios.get(`/unscrapeables`);

    dispatch({
      type: SET_UNSCRAPEABLES,
      payload: data.sites,
    });
  };

  useEffect(() => {
    setIntialState();
  }, []);

  //   UNSCRAPEABLE WEBSITE BASED FUNCTIONS
  const addUnscrapeable = async (site) => {
    console.log("UNSCRAPEABLE WEBSITE TO ADD", site);
    dispatch({
      type: ADD_UNSCRAPEABLE,
      payload: site,
    });
  };

  const deleteUnscrapeableByID = async (id) => {
    await axios.delete(`/unscrapeables/${id}`);
    dispatch({
      type: DELETE_UNSCRAPEABLE,
      payload: id,
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
    <UnscrapeableContext.Provider
      value={{
        sites: state.sites,
        addUnscrapeable,
        setIntialState,
        deleteUnscrapeableByID,
      }}
    >
      {props.children}
    </UnscrapeableContext.Provider>
  );
};

export default UnscrapeableState;
