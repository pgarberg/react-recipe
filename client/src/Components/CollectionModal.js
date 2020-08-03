import React, { useState, useContext } from "react";
import CollectionContext from "../Context/Collections/collectionContext";

export const CollectionModal = () => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value);
  const { addCollection } = useContext(CollectionContext);
  return (
    <div>
      <div
        class="modal fade"
        id="CollectionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalCenterTitle">
                Add Collection
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
                  <label for="Collection-title" class="col-form-label">
                    Collection Title
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
                  onClick={() => addCollection(title)}
                >
                  Add Collection
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
