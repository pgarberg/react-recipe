import React from "react";
import { Link } from "react-router-dom";

export const Collections = () => {
  return (
    <div className="container">
      <h1 className="tas">Collections</h1>
      <hr className="mb-4" />
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
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
      </div>
    </div>
  );
};
