import React, { useContext } from "react";

import recipeContext from "../Context/Recipes/recipeContext";
import { RecipeCard } from "./RecipeCard";

export const Favourites = () => {
  const { recipes } = useContext(recipeContext);
  const favourites = recipes.filter((recipe) => recipe.favourite === true);
  return (
    <div className="container">
      <h1 className="tas">Favourites</h1>
      <hr className="mb-4" />
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
        {favourites.length > 0 &&
          favourites.map((favourite) => <RecipeCard recipe={favourite} />)}
      </div>
    </div>
  );
};
