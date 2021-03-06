import React from "react";
import { Link } from "react-router-dom";

const MealCard = ({ recipe, day, recipeID, removeRecipeFromMealPlan }) => {
  return (
    <div>
      <div class="card">
        <div>
          <Link to={`/recipe/${recipe._id}`}>
            <img
              src={recipe.image[0]}
              className="card-img-top img-fluid"
              alt="..."
            />
          </Link>
        </div>
        <div class="card-body">
          <h5>{recipe.name}</h5>
          <p
            class="card-link"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => removeRecipeFromMealPlan({ recipeID, day })}
          >
            REMOVE
          </p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
