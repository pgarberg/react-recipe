import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RecipeContext from "../Context/Recipes/recipeContext";

export const Recipes = props => {
  const { recipes } = useContext(RecipeContext);
  const [filter, setFilter] = useState("");
  const handleChange = e => {
    setFilter(e.target.value);
  };
  return (
    <div>
      <div class="input-group m-3 mr-5 w-25">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Filter Recipes
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={filter}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-4 ml-1 mt-5">
        {recipes &&
          recipes.length > 0 &&
          recipes
            .filter(recipe =>
              recipe.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(recipe => (
              <div className="col mb-4">
                <div class="card" style={{ width: "18rem" }}>
                  <div style={{ overflow: "hidden", maxHeight: "200px" }}>
                    <Link to={`/recipe/${recipe._id}`}>
                      <img
                        src={recipe.image[0]}
                        className="card-img-top img-fluid"
                        alt="..."
                        style={{
                          height: "auto",
                          margin: "auto",
                          overflow: "hidden",
                          position: "relative",
                          top: "50%",
                          transform: "translateY(-50%)"
                        }}
                      />
                    </Link>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{recipe.name}</h5>
                    <p class="card-text">
                      <a href={recipe.url}>{recipe.author}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
