const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const pinchofyum = async recipe_url => {
  try {
    console.log("RUNNING pinchofyum");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll(
        "[class*='tasty-recipes-ingredients'] ul li"
      )
    ).map(cn => cn.textContent.trim());

    let recipeIngredient = rawIngredients;
    console.log(" recipeIngredient:", recipeIngredient);
    const prepTime = dom.window.document
      .querySelectorAll("[class*='tasty-recipes-prep-time']")[0]
      .textContent.trim();

    const cookTime = dom.window.document
      .querySelectorAll("[class*='tasty-recipes-cook-time']")[0]
      .textContent.trim();

    const totalTime = dom.window.document
      .querySelectorAll("[class*='tasty-recipes-total-time']")[0]
      .textContent.trim();

    console.log(" times:", prepTime, cookTime, totalTime);

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll(
        "[class*='tasty-recipes-instructions'] ol li"
      )
    ).map(cn => {
      if (cn.textContent.trim() !== "") {
        return { "@type": "HowToStep", text: cn.textContent.trim() };
      } else {
        return null;
      }
    });

    console.log(" recipeInstructions:", recipeInstructions);
    const recipeYield = dom.window.document.querySelector(
      "[class*='tasty-recipes-yield']"
    ).textContent;

    console.log(" recipeYield :", recipeYield);

    const name = dom.window.document.querySelectorAll(
      '[class*="entry-title"]'
    )[0].textContent;

    console.log(" name :", name);
    const image = [
      dom.window.document.querySelector("[class*='wp-block-image'] img").src
    ];

    console.log(" image :", image);

    const author = "Pinch of Yum";

    const footNotes = Array.from(
      dom.window.document.querySelectorAll("[class*='tasty-recipes-notes'] p")
    ).map(cn => cn.textContent.trim());
    console.log(" footNotes :", footNotes);
    const recipe = {
      name,
      author,
      image,
      url: recipe_url,
      recipeYield,
      recipeIngredient,
      recipeInstructions,
      footNotes,
      prepTime,
      cookTime,
      totalTime,
      recipeCategory: [],
      recipeCuisine: []
    };
    console.log(" recipe : ", recipe);
    return {
      status: 200,
      msg: "Recipe Successfully Created",
      recipe
    };
  } catch (error) {
    return {
      status: 400,
      msg: "Error Encountered",
      recipe: "",
      url: recipe_url
    };
  }
};

module.exports = pinchofyum;
