import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../Context/Auth/authContext";

export const Nav2 = () => {
  const { user, removeUser } = useContext(authContext);

  const renderLinks = () => {
    if (user !== null) {
      return (
        <ul class="nav mt-2">
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
            <Link class="nav-link" to="/mealplanner">
              Meal Planner
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3.2rem",
        right: "0",
        top: "0",
        zIndex: "30",
        left: "0",
        position: "absolute",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>ReactRecipes</h3>
      </div>
      <div
        style={{
          background: "0 0",
          display: "block",
          textAlign: "left",
          overflow: "visible",
          position: "static",
          zIndex: "0",
        }}
      ></div>{" "}
      {renderLinks()}
    </div>
  );
};
