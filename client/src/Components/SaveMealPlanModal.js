import React, { useState, useContext } from "react";
import MealPlanContext from "../Context/MealPlans/mealplanContext";

export const SaveMealPlanModal = () => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value);
  const { mealplan, createMealPlan } = useContext(MealPlanContext);
  return (
    <div>
      <div
        class="modal fade"
        id="SaveMealPlanModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Save Meal Plan
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div class="form-group">
                  <label for="MealPlan-title" class="col-form-label">
                    Meal Plan Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="collection-title"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <button
                  className="btn btn-success"
                  onClick={() => createMealPlan({ title, mealplan })}
                >
                  Save Meal Plan
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
