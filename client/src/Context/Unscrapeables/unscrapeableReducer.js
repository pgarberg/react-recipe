import {
  ADD_UNSCRAPEABLE,
  DELETE_UNSCRAPEABLE,
  SET_UNSCRAPEABLES
} from "../types";

const unscrapeableReducer = (state, action) => {
  console.log("CALLING UNSCRAPEABLE REDUCER");
  switch (action.type) {
    case SET_UNSCRAPEABLES:
      console.log("CALL SET UNSCRAPEABLES WITH...", action);
      return { ...state, sites: [...action.payload] };
    case ADD_UNSCRAPEABLE:
      console.log("CALLING ADD UNSCRAPEABLE!");
      console.log(action.payload);
      const newSite = action.payload;
      console.log("sitesss: ", [...state.sites, newSite]);
      return { ...state, sites: [...state.sites, newSite] };
    case DELETE_UNSCRAPEABLE:
      return {
        ...state,
        sites: state.sites.filter(r => r._id !== action.payload)
      };
    default:
      return { ...state };
  }
};

export default unscrapeableReducer;
