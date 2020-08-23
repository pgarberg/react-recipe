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
    const regex = /\s(g|kg|kgs|lbs|mL|L|grams|cps|cups|tblspns|tspn)\/|\s(g|kg|kgs|lbs|mL|L|grams|cps|cups|tblspns|tspn)\/|^(g|kg|kgs|lbs|mL|L|grams|cps|cups|tblspns|tspn)\s|\s(g|kg|kgs|lbs|mL|L|grams|cps|cups|tblspns|tspn)\s|[0-9]+\s+\w+\s+[0-9]+\s+|[0-9]+\/*[a-z]*|\u00BE|\u00BD|\u00BC |\[.+?\]\((.*)\)|\((.*)\((.*)\)(.*)\)|\*|\/|:|-|\.|,.*$|\([^)]+\)|\b(tin|fresh|ripe)\b|\b(cup|tsp|tablespoon|water|tbsp|trimmed|julienned|tablespoons|medium|large|small|clove|cloves|pound|pounds|oz|ounces|lb|lbs|teaspoons|fresh|freshly|cracked|fine|for|to|get|finely|of|chopped|shredded|teaspoon|cups|chopped|diced|minced|package|leaves|zest|big|handful|sliced|packages|few|many|pinch|tblspn)\b|or$|or\s$/gim;
    const regex2 = /or\s$|or$\/s/;
    let newP = p.replace(regex, "").trim();
    if (newP.includes("lemongrass")) {
      console.log(newP);
    }
    let addP = newP.replace(regex2, "").trim();

    // console.log("newP", newP);
    // console.log("transformedGroceryList", transformedGroceryList);
    // console.log(
    //   "transformedGroceryList.includes(newP)",
    //   transformedGroceryList.includes(newP)
    // );

    if (!transformedGroceryList.includes(addP) && addP !== "") {
      transformedGroceryList.push(addP.toLowerCase());
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
