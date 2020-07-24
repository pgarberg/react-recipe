import React, { useState, useEffect, useContext } from "react";
import { RecipePreview } from "./RecipePreview";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import RecipeContext from "../Context/Recipes/recipeContext";

export const AddRecipe = () => {
  const [fetch_url, setFetchUrl] = useState("");
  const [alert, setAlert] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { addRecipe } = useContext(RecipeContext);

  const sumbitCompleteRecipe = async (recipe) => {
    const res = await Axios({
      method: "post",
      url: "/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        recipe,
      },
    });

    const rpy = res.data.recipe;
    addRecipe(rpy);
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

  const handleFetch = async () => {
    setFetching(true);
    const { data } = await Axios({
      method: "post",
      url: "/scrape",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        url: fetch_url,
      },
    });

    if (data && data.status === 200) {
      const recipe = {
        ...data.recipe,
        recipeString: data.recipe.recipeInstructions.map((i) => i.text),
        recipeNotes: [],
      };
      console.log("RECIPE", recipe);

      setRecipe(recipe);
      setFetching(false);
    } else if (data.status === 400) {
      setAlert(true);
      setFetching(false);
    }
    // setRecipe({
    //   name: "Pork and Peanut Dragon Noodles",
    //   author: "BudgetBytes",
    //   datePublished: "03-24-2019",
    //   image: [
    //     "https://www.budgetbytes.com/wp-content/uploads/2018/01/Pork-and-Peanut-Dragon-Noodles-eat-2.jpg"
    //   ],
    //   recipeYield: "6 Servings",
    //   prepTime: "10M",
    //   cookTime: "15M",
    //   totalTime: "25M",
    //   recipeIngredient: ["1/4 Cup Chili Garlic Sauce", "1 LB Ground Pork"],
    //   recipeString: [
    //     "Combine the chili garlic sauce, soy sauce, and brown sugar in a bowl.",
    //     "Add the ground pork to a skillet and cook over medium heat until it is fully browned*. Once browned, add the prepared dragon sauce and chopped peanuts. Allow the pork and peanuts to simmer in the sauce for another 5 minutes, or until the sauce has reduced by half.",
    //     "While the pork is browning, begin boiling water for your noodles. Once boiling, add your noodles and cook according to the package directions. Drain the noodles in a colander."
    //   ],
    //   recipeInstructions: [
    //     {
    //       "@Type": "HowToStep",
    //       text:
    //         "Combine the chili garlic sauce, soy sauce, and brown sugar in a bowl."
    //     },
    //     {
    //       "@Type": "HowToStep",
    //       text:
    //         "Add the ground pork to a skillet and cook over medium heat until it is fully browned*. Once browned, add the prepared dragon sauce and chopped peanuts. Allow the pork and peanuts to simmer in the sauce for another 5 minutes, or until the sauce has reduced by half."
    //     },
    //     {
    //       "@Type": "HowToStep",
    //       text:
    //         "While the pork is browning, begin boiling water for your noodles. Once boiling, add your noodles and cook according to the package directions. Drain the noodles in a colander."
    //     }
    //   ],

    //   recipeCategory: ["Japanese"],
    //   recipeCuisine: ["Japanese"],
    //   url: "https://www.budgetbytes.com/pork-peanut-dragon-noodles/"
    // });
  };

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

  const handleChange = (e) => {
    const updatedRecipe = { ...recipe };
    switch (e.target.name) {
      case "image":
        updatedRecipe["image"] = e.target.value.split(`/n`);
        break;
      case "recipeIngredient":
        updatedRecipe["recipeIngredient"] = e.target.value.split(`\n`);
        break;
      case "recipeString":
        updatedRecipe["recipeString"] = e.target.value.split(`\n`);
        const instructions = e.target.value.split(`\n`);
        updatedRecipe["recipeInstructions"] = instructions.map(
          (instruction) => {
            return { "@type": "HowToStep", text: instruction };
          }
        );

        break;
      case "recipeNotes":
        updatedRecipe["recipeNotes"] = e.target.value.split(`\n`);
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
      {redirect && <Redirect to="/" />}
      {alert && (
        <div class="alert alert-danger" role="alert">
          Could not fetch recipe from URL provided!
        </div>
      )}
      {/* name: String,
  author: String,
  datePublished: String,
  image: [{ type: String }],
  recipeYield: String,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  recipeIngredient: [{ type: String }],
  recipeInstructions: [{ "@type": String, text: String }],
  recipeCategory: [String],
  recipeCuisine: [String],
  url: String */}
      <h1>Add Recipe</h1>
      <hr />

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Import Recipe From URL"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={fetch_url}
          onChange={(e) => setFetchUrl(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleFetch() : null)}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => handleFetch()}
          >
            Import
          </button>
        </div>
        {fetching && (
          <div class="spinner-border text-primary ml-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
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
            <label for="exampleFormControlInput1">Recipe URL</label>
            <input
              name="url"
              type="text"
              class="form-control"
              value={recipe.url}
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
          {/* name: String,
  author: String,
  datePublished: String,
  image: [{ type: String }],
  recipeYield: String,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  recipeIngredient: [{ type: String }],
  recipeInstructions: [{ "@type": String, text: String }],
  recipeCategory: [String],
  recipeCuisine: [String],
  url: String */}
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
              name="recipeString"
              type="text"
              class="form-control"
              placeholder={
                "1 instruction, per line \n1 enter, to get to new line"
              }
              value={recipe.recipeString.join("\n")}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Recipe Notes</label>
            <textarea
              name="recipeNotes"
              type="text"
              class="form-control"
              placeholder={
                "1 instruction, per line \n1 enter, to get to new line"
              }
              value={recipe.recipeNotes.join("\n")}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => sumbitCompleteRecipe(recipe)}
          >
            Submit Recipe
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
