import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CollectionModal } from "./CollectionModal";
import MealPlanContext from "../Context/MealPlans/mealplanContext";
import { CollectionCard } from "./CollectionCard";

export const SavedMealPlans = () => {
  const { savedPlans } = useContext(MealPlanContext);
  return (
    <div className="container">
      <h1 className="tas">Saved Meal Plans</h1>
      {/* <CollectionModal /> */}
      <hr className="mb-4" />
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
        <div className="col mb-4 d-flex justify-content-center">
          {savedPlans &&
            savedPlans.map((mealplan) => (
              <div class="card" style={{ width: "18rem" }}>
                <Link to="/">
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: "200px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                    className="d-flex"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"
                      className="card-img-top img-fluid"
                      alt="..."
                      style={{
                        width: "auto",
                        margin: "auto",
                        maxHeight: "125px",
                        overflow: "hidden",
                      }}
                    />
                  </div>

                  <div
                    class="card-body"
                    style={{
                      borderTop: "1px solid rgba(0,0,0,.125)",
                      borderRadius: ".25rem",
                    }}
                  >
                    <h5 class="card-title">{mealplan.title}</h5>
                    <p class="card-text"></p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
