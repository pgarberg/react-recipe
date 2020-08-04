import React from "react";
import { Link } from "react-router-dom";

export const CollectionCard = ({ collection }) => {
  const renderImage = () => {
    if (collection.recipes.length === 0) {
      return (
        <h2
          className="card-img-top img-fluid my-5 py-3"
          style={{
            height: "auto",
            margin: "auto",
            overflow: "hidden",
            position: "relative",
            top: "50",
          }}
        >
          Empty
        </h2>
      );
    } else {
      return (
        <img
          src={collection.recipes[0].image[0]}
          className="card-img-top img-fluid"
          alt="..."
        />
      );
    }
  };
  return (
    <div className="col mb-4 d-flex justify-content-center">
      <div class="card" style={{ width: "18rem" }}>
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
          <Link to={`/collections/${collection._id}`}>{renderImage()}</Link>
        </div>
        <div
          class="card-body"
          style={{
            borderTop: "1px solid rgba(0,0,0,.125)",
            borderRadius: ".25rem",
          }}
        >
          <h5 class="card-title">{collection.title}</h5>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  );
};
