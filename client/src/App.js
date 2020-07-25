import React from "react";
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
import AuthState from "./Context/Auth/AuthState";
import RecipesState from "./Context/Recipes/RecipesState";
import UnscrapeableState from "./Context/Unscrapeables/UnscrapeableState";
import { Unscrapeables } from "./Components/Unscrapeables";
import WeekPlanner from "./Components/WeekPlanner";
import { Collections } from "./Components/Collections";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";

function App() {
  return (
    <AuthState>
      <RecipesState>
        <UnscrapeableState>
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
                <Route exact path="/weeklyplanner">
                  <WeekPlanner />
                </Route>
                <Route exact path="/collections">
                  <Collections />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
              </Switch>
            </div>
          </Router>
        </UnscrapeableState>
      </RecipesState>
    </AuthState>
  );
}

export default App;
