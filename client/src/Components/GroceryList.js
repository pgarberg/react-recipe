import React, { useContext } from "react";
import mealplanContext from "../Context/MealPlans/mealplanContext";

export const GroceryList = () => {
  const { mealplan } = useContext(mealplanContext);
  let groceryList = [];
  for (const day in mealplan) {
    console.log("mealplan[day] :>> ", mealplan[day]);
    mealplan[day].map((recipe) => {
      if (recipe.recipeIngredient) {
        recipe.recipeIngredient.map((ingredient) =>
          groceryList.push(ingredient)
        );
      }
    });
  }
  let transformedGroceryList = [];

  groceryList.map((item) => {
    let p = item;
    const regex = /[0-9]+\/*[a-z]*|\u00BE|\u00BD|\u00BC |\*|\/|:|-|\.|,.*$|\([^)]+\)|\b(tin|fresh|ripe)\b|\b(cup|tsp|tablespoon|water|tbsp|trimmed|tablespoons|medium|large|small|clove|cloves|pound|pounds|oz|ounces|lb|lbs|teaspoons|teaspoon|cups|chopped|diced|minced|tblspn)\b/gim;
    let newP = p.replace(regex, "").trim();
    console.log("newP", newP);
    console.log("transformedGroceryList", transformedGroceryList);
    console.log(
      "transformedGroceryList.includes(newP)",
      transformedGroceryList.includes(newP)
    );

    if (!transformedGroceryList.includes(newP) && newP !== "") {
      transformedGroceryList.push(newP);
    }
  });

  return (
    <div className="container">
      <h3>GroceryList</h3>
      <hr className="mb-4" />

      <ul>
        {transformedGroceryList.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
};
