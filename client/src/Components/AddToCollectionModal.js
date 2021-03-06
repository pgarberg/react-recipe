import React, { useState, useContext } from "react";
import recipeContext from "../Context/Recipes/recipeContext";
import collectionContext from "../Context/Collections/collectionContext";
import { Redirect } from "react-router-dom";

export const AddToCollectionModal = ({ recipe }) => {
  const [collectionID, setCollectionID] = useState("");

  const { collections, addRecipeToCollection } = useContext(collectionContext);

  const handleClick = async () => {
    const status = addRecipeToCollection(recipe, collectionID);

    if (status === 200) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (e) => {
    setCollectionID(e.target.id);
  };
  return (
    <div>
      <div
        class="modal fade"
        id="AddToCollectionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Add Recipe To Collection
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
              Which Collection would you like to add{" "}
              <strong>{recipe.name}</strong> to?
              {collections.map((collection) => (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="dailyradios"
                    id={collection._id}
                    value={collection._id}
                    onChange={(e) => handleChange(e)}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    {collection.title}
                  </label>
                </div>
              ))}
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
