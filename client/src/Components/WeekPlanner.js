import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeContext from "../Context/Recipes/recipeContext";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

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

const WeekPlanner = () => {
  const { recipes, deleteRecipeByID, weekly } = useContext(RecipeContext);
  const id = "5e83cb47ff04a63980a56a31";

  let recipe = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe._id === id)[0]
    : "";
  console.log("RECIPE : ", recipe);

  return (
    <div className="container">
      <h1>Weekly Meal Planner</h1>
      <hr />
      <Calendar>
        <Day>
          {" "}
          <h3>Monday</h3>
          <div>
            {weekly.monday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Tuesday</h3>
          <div>
            {weekly.tuesday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
        <Day>
          {" "}
          <h3>Wednesday</h3>
          <div>
            {weekly.wednesday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Thursday</h3>
          <div>
            {weekly.thursday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Friday</h3>
          <div>
            {weekly.friday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
        <Day>
          <h3>Saturday</h3>
          <div>
            {weekly.saturday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>

        <Day>
          <h3>Sunday</h3>
          <div>
            {weekly.sunday.map((r) => (
              <MealCard recipe={r} />
            ))}
          </div>
        </Day>
      </Calendar>
    </div>
  );
};

export default WeekPlanner;
