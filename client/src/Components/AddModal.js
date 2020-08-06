import React, { useState, useContext } from "react";
import recipeContext from "../Context/Recipes/recipeContext";

export const AddModal = ({
  name,
  id,
  addRecipeToMealPlan,
  setRedirect,
  recipe,
}) => {
  const [radio, setRadio] = useState({ selected: "monday" });

  const { weekly } = useContext(recipeContext);

  const handleClick = async () => {
    console.log(recipe);
    console.log("Add to day : ", radio);
    await addRecipeToMealPlan({ recipe, day: radio.selected });

    setRedirect(true);
  };

  const handleChange = (e) => {
    setRadio({ selected: e.target.value });
  };
  return (
    <div>
      <div
        class="modal fade"
        id="AddModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Add To Meal Plan
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
              Which day would you like to have <strong>{name}</strong>?
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="monday"
                  value="monday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios1">
                  Monday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="tuesday"
                  value="tuesday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Tuesday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="wednesday"
                  value="wednesday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Wednesday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="thursday"
                  value="thursday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Thursday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="friday"
                  value="friday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Friday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="saturday"
                  value="saturday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Saturday
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="dailyradios"
                  id="sunday"
                  value="sunday"
                  onChange={(e) => handleChange(e)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Sunday
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClick()}
              >
                <button className="btn btn-info">Confirm Selection</button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
