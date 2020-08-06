import React, { useState, useContext } from "react";
import recipeContext from "../Context/Recipes/recipeContext";

export const AddOptionModal = ({
  name,
  id,
  addRecipeToDay,
  setRedirect,
  recipe,
}) => {
  const [radio, setRadio] = useState({ selected: "monday" });

  const { weekly } = useContext(recipeContext);

  const handleClick = async () => {
    console.log(recipe);
    console.log("Add to day : ", radio);
    await addRecipeToDay({ recipe, day: radio.selected });

    setRedirect(true);
  };

  const handleChange = (e) => {
    setRadio({ selected: e.target.value });
  };
  return (
    <div>
      <div
        class="modal fade"
        id="AddOptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Add Recipe to...
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
              <div className="my-4">
                <button
                  className="btn btn-success"
                  style={{ minWidth: "160px" }}
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#AddToCollectionModal"
                >
                  Collection
                </button>
              </div>
              <div className="my-4">
                <button
                  className="btn btn-info "
                  style={{ minWidth: "160px" }}
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#AddModal"
                >
                  Meal Plan
                </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
