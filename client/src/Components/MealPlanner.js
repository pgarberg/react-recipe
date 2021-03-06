import React, { useContext } from "react";

import RecipeContext from "../Context/Recipes/recipeContext";
import mealplanContext from "../Context/MealPlans/mealplanContext";

import styled from "styled-components";
import MealCard from "./MealCard";
import { SaveMealPlanModal } from "./SaveMealPlanModal";

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
`;

const Day = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr;
  grid-column-gap: 7px;
  grid-row-gap: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MealPlanner = () => {
  const { recipes, deleteRecipeByID } = useContext(RecipeContext);

  const { mealplan, removeRecipeFromMealPlan, clearMealPlan } = useContext(
    mealplanContext
  );

  const id = "5e83cb47ff04a63980a56a31";

  let recipe = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe._id === id)[0]
    : "";
  console.log("RECIPE : ", recipe);

  return (
    <div className="container tas">
      <h1 className="">Weekly Meal Planner</h1>
      <SaveMealPlanModal />
      <hr />
      <ButtonContainer>
        <button
          className="btn btn-primary"
          type="button"
          data-toggle="modal"
          data-target="#SaveMealPlanModal"
        >
          Save Plan
        </button>
        <button className="btn btn-danger" onClick={() => clearMealPlan()}>
          Clear Plan
        </button>
      </ButtonContainer>
      <hr />
      <Calendar>
        <Day>
          {" "}
          <h3>Monday</h3>
          <div>
            {mealplan.monday.map((r) => (
              <MealCard
                day="monday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Tuesday</h3>
          <div>
            {mealplan.tuesday.map((r) => (
              <MealCard
                day="tuesday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Wednesday</h3>
          <div>
            {mealplan.wednesday.map((r) => (
              <MealCard
                day="wednesday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Thursday</h3>
          <div>
            {mealplan.thursday.map((r) => (
              <MealCard
                day="thursday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Friday</h3>
          <div>
            {mealplan.friday.map((r) => (
              <MealCard
                day="friday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Saturday</h3>
          <div>
            {mealplan.saturday.map((r) => (
              <MealCard
                day="saturday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>

        <Day>
          <h3>Sunday</h3>
          <div>
            {mealplan.sunday.map((r) => (
              <MealCard
                day="sunday"
                recipe={r}
                recipeID={r._id}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
              />
            ))}
          </div>
        </Day>
      </Calendar>
    </div>
  );
};

export default MealPlanner;
