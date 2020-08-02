import React from "react";
import { Link } from "react-router-dom";

export const RecipeCard = ({ recipe }) => {
  return (
    <div className="col mb-4 d-flex justify-content-center">
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
                transform: "translateY(-50%)",
              }}
            />
          </Link>
        </div>
        <div class="card-body">
          <h5 class="card-title">{recipe.name}</h5>
          <p class="card-text">{recipe.author}</p>
        </div>
      </div>
    </div>
  );
};
