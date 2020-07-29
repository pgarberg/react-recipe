import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../Context/Auth/authContext";

export const Nav = () => {
  const { user, removeUser } = useContext(authContext);

  const renderLinks = () => {
    if (user !== null) {
      return (
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
          <li class="nav-item">
            <Link class="nav-link" to="/collections">
              Collections
            </Link>
          </li>
          <li class="nav-item" onClick={() => removeUser()}>
            <a class="nav-link" href="/api/logout">
              Logout
            </a>
          </li>
          <li class="nav-item nav-link">Current User : {user && user._id}</li>
        </ul>
      );
    } else {
      return (
        <ul class="nav">
          <li class="nav-item">
            <Link class="nav-link active" to="/login">
              Login
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      );
    }
  };
  return <div>{renderLinks()}</div>;
};
