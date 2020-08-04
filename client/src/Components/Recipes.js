import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import RecipeContext from "../Context/Recipes/recipeContext";
import authContext from "../Context/Auth/authContext";
import { RecipeCard } from "./RecipeCard";

export const Recipes = (props) => {
  const { user } = useContext(authContext);

  const { recipes } = useContext(RecipeContext);
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const renderRecipes = () =>
    recipes.length > 0 ? (
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
        {recipes
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
      </div>
    ) : (
      <div
        style={{
          height: "80vh",
          marginTop: "-10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>
          You currently do not have any recipes. Let's{" "}
          <Link to="/addrecipe">ADD</Link> some!
        </h2>
      </div>
    );

  return (
    <div>
      {user === null && <Redirect to="/login" />}

      <div className="container">
        <div
          class="input-group m-3 mr-5 w-50"
          style={{ minWidth: "300px", maxWidth: "400px" }}
        >
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              Filter Recipes
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Recipe Name"
            aria-label="Recipe Name"
            aria-describedby="basic-addon1"
            value={filter}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {renderRecipes()}
      </div>
    </div>
  );
};
