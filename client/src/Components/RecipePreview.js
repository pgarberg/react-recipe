import React from "react";

export const RecipePreview = (props) => {
  const { recipe } = props;

  return (
    <div className="page_wrapper">
      {recipe && (
        <div style={{ borderLeft: "0.05px solid grey", paddingLeft: "50px" }}>
          <h1 class="display-4">{recipe.name}</h1>
          <hr />
          <div style={{ maxHeight: "250px", overflow: "hidden" }}>
            <img
              alt={`Image of the ${recipe.name}.`}
              src={recipe.image[0]}
              style={{ maxWidth: "400px", height: "auto" }}
            />
          </div>
          <hr />
          <a href={recipe.url}>
            <h3>{recipe.author}</h3>
          </a>

          <div class="container mt-5">
            <div class="row">
              <div class="col">
                <h4
                  style={{ borderBottom: "1px solid black" }}
                  className="pb-3"
                >
                  Ingredients
                </h4>
                <ul>
                  {recipe.recipeIngredient.map((ing) => (
                    <li>{ing}</li>
                  ))}
                </ul>
              </div>
              <div class="col">
                <h4
                  style={{ borderBottom: "1px solid black" }}
                  className="pb-3"
                >
                  Instructions
                </h4>
                <ol>
                  {recipe.recipeInstructions.map(
                    (ing) => ing.text && <li>{ing.text}</li>
                  )}
                </ol>
              </div>
            </div>
            <h4 style={{ borderBottom: "1px solid black" }} className="pb-3">
              Notes
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
