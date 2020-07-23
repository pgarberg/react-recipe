import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { Recipes } from "./Components/Recipes";
import { Recipe } from "./Components/Recipe";
import ScrollToTop from "./Components/ScrollToTop";
import { Nav } from "./Components/Nav";
import { AddRecipe } from "./Components/AddRecipe";
import { EditRecipe } from "./Components/EditRecipe";
import RecipesState from "./Context/Recipes/RecipesState";
import UnscrapeableState from "./Context/Unscrapeables/UnscrapeableState";
import { Unscrapeables } from "./Components/Unscrapeables";
import WeekPlanner from "./Components/WeekPlanner";

function App() {
  return (
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
            </Switch>
          </div>
        </Router>
      </UnscrapeableState>
    </RecipesState>
  );
}

export default App;
