import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AuthState from "./Context/Auth/AuthState";
import RecipesState from "./Context/Recipes/RecipesState";
import CollectionState from "./Context/Collections/CollectionState";
import MealPlanState from "./Context/MealPlans/MealPlanState";
import "./theme.css";
import UnscrapeableState from "./Context/Unscrapeables/UnscrapeableState";

// optional configuration for react-alerts
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const Root = () => (
  <AuthState>
    <CollectionState>
      <MealPlanState>
        <RecipesState>
          <UnscrapeableState>
            <AlertProvider template={AlertTemplate} {...options}>
              <App />
            </AlertProvider>
          </UnscrapeableState>
        </RecipesState>
      </MealPlanState>
    </CollectionState>
  </AuthState>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
