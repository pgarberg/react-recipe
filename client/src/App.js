import React, { useContext, useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import "./App.css";
import { Recipes } from "./Components/Recipes";
import { Recipe } from "./Components/Recipe";
import ScrollToTop from "./Components/ScrollToTop";
import { Nav } from "./Components/Nav";
import { AddRecipe } from "./Components/AddRecipe";
import { EditRecipe } from "./Components/EditRecipe";

import { Unscrapeables } from "./Components/Unscrapeables";
import MealPlanner from "./Components/MealPlanner";
import { Collections } from "./Components/Collections";
import Login from "./Components/Login";
import Register from "./Components/Register";
import authContext from "./Context/Auth/authContext";
import { Favourites } from "./Components/Favourites";
import { Collection } from "./Components/Collection";

function App() {
  const { fetchUser } = useContext(authContext);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Router>
      <div className="App">
        <Nav />
        <ScrollToTop />
        <Switch>
          <Route exact path="/recipe/:id">
            <Recipe />
          </Route>
          <Route exact path="/recipe/:id/edit">
            <EditRecipe />
          </Route>
          <Route exact path="/">
            <Recipes />
          </Route>
          <Route exact path="/addrecipe">
            <AddRecipe recipe={{}} />
          </Route>
          <Route exact path="/unscrapeables">
            <Unscrapeables />
          </Route>
          <Route exact path="/mealplanner">
            <MealPlanner />
          </Route>
          <Route exact path="/collections">
            <Collections />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/collections/favourites">
            <Favourites />
          </Route>
          <Route exact path="/collections/:id">
            <Collection />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
