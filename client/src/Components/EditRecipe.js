import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { RecipePreview } from "./RecipePreview";
import { Redirect } from "react-router-dom";
import Axios from "axios";

// TODO :
//WE ARE ABLE TO SEND THE UPDATES TO OUR BACKEND, HOWEVER, WE NEED TO MAKE SURE TO UPDATE OUR LOCAL STATE
//SO EDITS ARE VISIBLE ON REDIRECT

export const EditRecipe = () => {
  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    name: "TEST",
    author: "NAME",
    datePublished: "07-22-2019",
    image: [
      "https://www.simplyrecipes.com/wp-content/uploads/2017/06/2017-07-19-ChickenNoodleBowls-7-600x840.jpg",
    ],
    recipeYield: "4 Servings",
    prepTime: "35M",
    cookTime: "25M",
    totalTime: "1H",
    recipeIngredient: ["Vermicelli Noodles"],
    recipeInstructions: [],
    recipeString: [],
    recipeCategory: ["Vietnamese"],
    recipeCuisine: ["Vietnamese"],
    url: "",
    recipeNotes: [],
  });

  useEffect((id) => {
    async function fetchdata() {
      const res = await Axios({
        method: "get",
        url: `http://localhost:4000/recipe/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRecipe(res.data.recipe);
    }

    fetchdata();
  }, []);

  const updateData = async () => {
    console.log("DEFAULT PRENTED");
    let ress = recipe;
    async function postData() {
      console.log("Will send ", ress);
      const res = await Axios({
        method: "post",
        url: `/recipe/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(ress),
      });
    }

    await postData(recipe);
    setRedirect(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  const handleChange = (e) => {
    const updatedRecipe = { ...recipe };
    switch (e.target.name) {
      case "image":
        updatedRecipe["image"] = [e.target.value];
        break;
      case "recipeIngredient":
        updatedRecipe["recipeIngredient"] = e.target.value.split(`\n`);
        break;
      case "recipeInstructions":
        const instructions = e.target.value.split(`\n`);
        updatedRecipe["recipeInstructions"] = instructions.map(
          (instruction) => {
            return { "@type": "HowToStep", text: instruction };
          }
        );

        break;
      case "recipeCategory":
        updatedRecipe["recipeCategory"] = e.target.value.split(`\n`);
        break;
      case "recipeCuisine":
        updatedRecipe["recipeCuisine"] = e.target.value.split(`\n`);
        break;
      default:
        updatedRecipe[e.target.name] = e.target.value;
        break;
    }
    setRecipe(updatedRecipe);
  };
  return (
    <div className="container">
      {redirect && <Redirect to={`/recipe/${id}`} />}
      {alert && (
        <div class="alert alert-danger" role="alert">
          Could not fetch recipe from URL provided!
        </div>
      )}

      <h1>Edit Recipe</h1>
      <hr />

      <div className="grid-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Recipe Form</h3>
          <hr />
          <div class="form-group">
            <label for="exampleFormControlInput1">Name</label>
            <input
              name="name"
              type="text"
              class="form-control"
              placeholder="Name"
              value={recipe.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Author</label>
            <input
              name="author"
              type="text"
              class="form-control"
              placeholder="Author"
              value={recipe.author}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Date Published</label>
            <input
              name="datePublished"
              type="text"
              class="form-control"
              placeholder="Date Published"
              value={recipe.datePublished}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Image URL</label>
            <input
              name="image"
              type="text"
              class="form-control"
              placeholder="Image URL"
              value={recipe.image[0]}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Recipe Yield</label>
            <input
              name="recipeYield"
              type="text"
              class="form-control"
              placeholder="Yield"
              value={recipe.recipeYield}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect1">Prep Time</label>
            <input
              name="prepTime"
              type="text"
              class="form-control"
              placeholder="1H5M"
              value={recipe.prepTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Cook Time</label>
            <input
              name="cookTime"
              type="text"
              class="form-control"
              placeholder="55M"
              value={recipe.cookTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Total Time</label>
            <input
              name="totalTime"
              type="text"
              class="form-control"
              placeholder="2H0M"
              value={recipe.totalTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Recipe Ingredients</label>
            <textarea
              name="recipeIngredient"
              type="text"
              class="form-control"
              placeholder={
                "1 ingredient, per line \n1 enter, to get to new line"
              }
              value={recipe.recipeIngredient.join("\n")}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Recipe Instructions</label>
            <textarea
              name="recipeInstructions"
              type="text"
              class="form-control"
              placeholder={
                "1 instruction, per line \n1 enter, to get to new line"
              }
              value={recipe.recipeInstructions.map((c) => c.text).join("\n")}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Recipe Notes</label>
            <textarea
              name="recipeString"
              type="text"
              class="form-control"
              placeholder={
                "1 instruction, per line \n1 enter, to get to new line"
              }
              onChange={(e) => handleChange(e)}
            >
              {recipe.recipeNotes.length > 0
                ? recipe.recipeNotes.join("\n")
                : ""}
            </textarea>
          </div>
          <button
            className="btn btn-info"
            type="submit"
            onClick={() => updateData()}
          >
            Confirm Edits
          </button>
        </form>

        <div>
          <h3>Recipe Preview</h3>
          <hr />
          <RecipePreview recipe={recipe} />
        </div>
      </div>
    </div>
  );
};
