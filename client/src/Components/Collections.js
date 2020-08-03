import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CollectionModal } from "./CollectionModal";
import collectionContext from "../Context/Collections/collectionContext";
import { CollectionCard } from "./CollectionCard";

export const Collections = () => {
  const { collections } = useContext(collectionContext);
  return (
    <div className="container">
      <h1 className="tas">Collections</h1>
      <CollectionModal />
      <hr className="mb-4" />
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
        <div className="col mb-4 d-flex justify-content-center">
          <div
            class="card"
            style={{ width: "18rem" }}
            type="button"
            data-toggle="modal"
            data-target="#CollectionModal"
          >
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
              <h5 class="card-title">Add Collection</h5>
              <p class="card-text"></p>
            </div>
          </div>
        </div>

        <div className="col mb-4 d-flex justify-content-center">
          <div class="card" style={{ width: "18rem" }}>
            <div style={{ overflow: "hidden", maxHeight: "200px" }}>
              <Link to={`/collections/favourites`}>
                <img
                  src="https://gbc-cdn-public-media.azureedge.net/img80495.1426x713.jpg"
                  className="card-img-top img-fluid"
                  alt="..."
                  style={{
                    height: "auto",
                    margin: "auto",
                    overflow: "hidden",
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </Link>
            </div>
            <div class="card-body">
              <h5 class="card-title">Favourite Recipes</h5>
              <p class="card-text"></p>
            </div>
          </div>
        </div>

        {collections &&
          collections.map((collection) => (
            <CollectionCard collection={collection} />
          ))}
      </div>
    </div>
  );
};
