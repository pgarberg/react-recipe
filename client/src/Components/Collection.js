import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import collectionContext from "../Context/Collections/collectionContext";

export const Collection = () => {
  const { collections, removeRecipeFromCollection } = useContext(
    collectionContext
  );
  const { id } = useParams();

  let collection = Array.isArray(collections)
    ? collections.filter((collection) => collection._id === id)[0]
    : [];

  return (
    <div className="container">
      {collection && (
        <div>
          <h1 className="tas">Collection: {collection.title}</h1>
          <hr className="mb-4" />
          <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 ml-1 mt-5 ">
            {collection.recipes &&
              collection.recipes.map((recipe) => (
                <div>
                  <RecipeCard
                    recipe={recipe}
                    canDelete={true}
                    deleteFunction={() =>
                      removeRecipeFromCollection(recipe._id, collection._id)
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
