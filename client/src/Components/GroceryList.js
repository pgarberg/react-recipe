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
  console.log("groceryList :>> ", groceryList);
  return (
    <div className="container">
      <h3>GroceryList</h3>
      <hr className="mb-4" />

      <ul>
        {groceryList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};
