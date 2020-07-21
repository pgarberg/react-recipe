import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <ul class="nav">
        <li class="nav-item">
          <Link class="nav-link active" to="/">
            Recipes
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/addrecipe">
            Add Recipe
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/unscrapeables">
            Unscrapeable Sites
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/weeklyplanner">
            Weekly Planner
          </Link>
        </li>
      </ul>
    </div>
  );
};
