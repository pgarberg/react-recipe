import React, { useContext } from "react";
import RecipeContext from "../Context/Recipes/recipeContext";

export const Collection = () => {
  const { favourites } = useContext(RecipeContext);
  return <div></div>;
};
