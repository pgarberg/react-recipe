import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeContext from "../Context/Recipes/recipeContext";
import { Link, Redirect } from "react-router-dom";

import { DeleteModal } from "./DeleteModal";
import { AddModal } from "./AddModal";
import { AddOptionModal } from "./AddOptionModal";
import UnStar from "../Icons/UnStar";
import Star from "../Icons/Star";
import Plus from "../Icons/Plus";
import Delete from "../Icons/Delete";
import Edit from "../Icons/Edit";
import { AddToCollectionModal } from "./AddToCollectionModal";
import mealplanContext from "../Context/MealPlans/mealplanContext";

export const Recipe = (props) => {
  const {
    recipes,
    deleteRecipeByID,

    updateRecipeFavourite,
  } = useContext(RecipeContext);
  const { addRecipeToMealPlan } = useContext(mealplanContext);
  const { id } = useParams();
  const [editing, toggleEditing] = useState(false);
  const [edits, updateEdits] = useState({});
  let recipe = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe._id === id)[0]
    : "";
  const [instructions, editInstructions] = useState();
  const [ingredients, editIngredients] = useState();
  const [redirect, setRedirect] = useState(false);

  const [fave, setFave] = useState(false);

  useEffect(() => {
    if (recipe) {
      setFave(recipe.favourite);
    }
  }, [recipe]);

  const toggleFavourite = async () => {
    const status = await updateRecipeFavourite(id, recipe);
    console.log("status", status);
    if (status === 200) {
      setFave(!fave);
    }
  };

  const renderFav = () =>
    fave ? (
      <button
        style={{ minWidth: "160px", border: "1px solid black" }}
        className="btn btn-info"
        onClick={() => toggleFavourite()}
      >
        {" "}
        <Star />
      </button>
    ) : (
      <button
        style={{ minWidth: "160px", border: "1px solid black" }}
        className="btn btn-info"
        onClick={() => toggleFavourite()}
      >
        {" "}
        <UnStar />
      </button>
    );

  const handleEdits = (e) => {
    const { name, value } = e.target;

    const updatedEdits = { ...edits };
    updatedEdits[name] = value;

    if (name === "recipeIngredient") {
      editIngredients(e.target.value);
    }

    if (name === "recipeInstructions") {
      editInstructions(e.target.value);
    }

    updateEdits(updatedEdits);
  };

  return (
    <div className="page_wrapper">
      {redirect && <Redirect to={`/`} />}
      {recipe && !editing && (
        <div>
          <h1 class="display-4 tas">{recipe.name}</h1>
          <hr />
          <div
            style={{
              width: "80%",
              paddingTop: "50%",
              position: "relative",
              margin: "auto",
              backgroundColor: "rgb(242, 242, 242)",
            }}
          >
            <div
              style={{
                position: "absolute",
                padding: "5%",

                top: "0px",
                right: "0px",
                marginTop: "2.5%",
                height: "90%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={recipe.image[0]}
                style={{ maxWidth: "100%", height: "auto" }}
                alt={`Image of recipe ${recipe.name}`}
              />
            </div>
          </div>

          <hr />
          <div class="container">
            <div class="row d-flex justify-content-between w-75 m-auto">
              <Link to={`/recipe/${recipe._id}/edit`}>
                <div
                  class="btn btn-primary a-btn-slide-text "
                  style={{ minWidth: "160px" }}
                >
                  <span
                    class="glyphicon glyphicon-edit"
                    aria-hidden="true"
                  ></span>
                  <span>
                    <Edit />
                  </span>
                </div>
              </Link>

              <button
                type="button"
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#DeleteModal"
                style={{ minWidth: "160px" }}
              >
                <Delete />
              </button>
              <div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-toggle="modal"
                  data-target="#AddOptionModal"
                  style={{ minWidth: "160px" }}
                >
                  <Plus />
                </button>
              </div>
              {renderFav()}
            </div>
          </div>
          <div className="my-5"></div>
          <a href={recipe.url} className="tas">
            <h3>{recipe.author}</h3>
          </a>

          <div class="container mt-5">
            <DeleteModal
              name={recipe.name}
              id={recipe._id}
              deleteRecipeByID={deleteRecipeByID}
              setRedirect={setRedirect}
            />
            <AddModal
              name={recipe.name}
              id={recipe._id}
              deleteRecipeByID={deleteRecipeByID}
              setRedirect={setRedirect}
              recipe={recipe}
              addRecipeToMealPlan={addRecipeToMealPlan}
            />
            <AddToCollectionModal recipe={recipe} />
            <AddOptionModal />
            <div class="row">
              <div class="col">
                <h4
                  style={{ borderBottom: "1px solid black" }}
                  className="pb-3 mb-4"
                >
                  Ingredients
                </h4>
                <ul>
                  {recipe.recipeIngredient.map((ing) => (
                    <li>{ing}</li>
                  ))}
                </ul>
              </div>
              <div class="col">
                <h4
                  style={{ borderBottom: "1px solid black" }}
                  className="pb-3 mb-4"
                >
                  Instructions
                </h4>
                <ol>
                  {recipe.recipeInstructions.map(
                    (ing) => ing.text && <li>{ing.text}</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
      {recipe && (
        <div class="row mt-5" style={{ minHeight: "175px" }}>
          <div class="col">
            <h4 style={{ borderBottom: "1px solid black" }} className="pb-3">
              Notes
            </h4>
            <ul>
              {recipe.recipeNotes &&
                recipe.recipeNotes.map((ing) => <li>{ing}</li>)}
            </ul>
          </div>
        </div>
      )}
      {recipe && editing && (
        <div>
          <h1 class="display-4">{recipe.name}</h1>
          <hr />
          <div
            style={{
              width: "100%",
              paddingTop: "50%",

              position: "relative",
              marginBottom: "2%",
              backgroundColor: "rgb(242, 242, 242)",
            }}
          >
            <div
              style={{
                position: "absolute",
                padding: "10%",

                top: "0px",
                right: "0px",
                marginTop: "2.5%",
                height: "90%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={recipe.image[0]}
                style={{ maxWidth: "100%", height: "auto" }}
                alt={`Image of recipe ${recipe.name}`}
              />
            </div>
          </div>

          <hr />
          <div class="container">
            <div class="row">
              <div
                class="btn btn-success a-btn-slide-text mr-4"
                onClick={() => {
                  toggleEditing(!editing);
                }}
              >
                <span
                  class="glyphicon glyphicon-edit"
                  aria-hidden="true"
                ></span>
                <span>
                  <strong>Accept Edit</strong>
                </span>
              </div>

              <div
                class="btn btn-danger a-btn-slide-text"
                onClick={() => toggleEditing(!editing)}
              >
                <span
                  class="glyphicon glyphicon-remove"
                  aria-hidden="true"
                ></span>
                <span>
                  <strong>Cancel</strong>
                </span>
              </div>
            </div>
          </div>
          <a href={recipe.url}>
            <h3>{recipe.author}</h3>
          </a>

          <div class="container mt-5">
            <div class="row">
              <div class="col">
                <h4
                  style={{ borderBottom: "1px solid black" }}
                  className="pb-3"
                >
                  Ingredients
                </h4>
                <div class="form-group">
                  <textarea
                    name="recipeIngredient"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows={recipe.recipeIngredient.length + 1}
                    value={ingredients}
                    onChange={(e) => handleEdits(e)}
                  ></textarea>
                </div>
              </div>
              <div class="col">
                <h4 style={{ borderBottom: "1px solid black" }}>
                  Instructions
                </h4>
                <div class="form-group">
                  <textarea
                    name="recipeInstructions"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows={recipe.recipeInstructions.length + 1}
                    value={instructions}
                    onChange={(e) => handleEdits(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {recipe && editing && (
        <div class="row">
          <div class="col">
            <h4 style={{ borderBottom: "1px solid black" }} className="pb-3">
              Notes
            </h4>
            <div class="form-group">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows={recipe.recipeNotes.length + 1}
                value={recipe.recipeNotes.map((note) => {
                  return `${note}\n`;
                })}
              ></textarea>
            </div>
            <textarea style={{ border: "none" }} />
          </div>
        </div>
      )}
    </div>
  );
};
