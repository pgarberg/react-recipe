import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import mealplanContext from "../Context/MealPlans/mealplanContext";

import styled from "styled-components";
import MealCard from "./MealCard";

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

const SavedMealPlan = () => {
  const { id } = useParams();
  const { savedPlans, removeRecipeFromMealPlan, clearMealPlan } = useContext(
    mealplanContext
  );

  let savedplan = savedPlans
    ? savedPlans.filter((savedplan) => savedplan._id === id)[0]
    : {
        title: "",
        mealplan: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      };
  const { title, mealplan } = savedplan;
  return (
    <div className="container tas">
      <h1 className="">Meal Plan: {title}</h1>

      <hr />
      {/* <ButtonContainer>
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
      <hr /> */}
      <Calendar>
        <Day>
          {" "}
          <h3>Monday</h3>
          <div>
            {mealplan.monday.map((r) => (
              <MealCard day="monday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Tuesday</h3>
          <div>
            {mealplan.tuesday.map((r) => (
              <MealCard day="tuesday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Wednesday</h3>
          <div>
            {mealplan.wednesday.map((r) => (
              <MealCard day="wednesday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Thursday</h3>
          <div>
            {mealplan.thursday.map((r) => (
              <MealCard day="thursday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Friday</h3>
          <div>
            {mealplan.friday.map((r) => (
              <MealCard day="friday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Saturday</h3>
          <div>
            {mealplan.saturday.map((r) => (
              <MealCard day="saturday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>

        <Day>
          <h3>Sunday</h3>
          <div>
            {mealplan.sunday.map((r) => (
              <MealCard day="sunday" recipe={r} recipeID={r._id} />
            ))}
          </div>
        </Day>
      </Calendar>
    </div>
  );
};

export default SavedMealPlan;
