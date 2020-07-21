import React from "react";

export const DeleteModal = ({
  name,
  id,
  deleteRecipeByID,
  setRedirect,
  modalID,
}) => {
  console.log("ID : ", id);
  console.log("DRBI : ", deleteRecipeByID);
  const handleClick = () => {
    deleteRecipeByID(id);
    setRedirect(true);
  };
  return (
    <div>
      <div
        class="modal fade"
        id="DeleteModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Delete Recipe
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
              Are you sure you want to delete <strong>{name}</strong>?
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
                <button className="btn btn-danger">Confirm Deletion</button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
