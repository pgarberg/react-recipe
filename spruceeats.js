const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const spruceeats = async recipe_url => {
  try {
    console.log("RUNNING SPRUCE EATS");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[class*='ingredient-list']")
    ).map(cn => Array.from(cn.children).map(child => child.textContent.trim()));

    const recipeIngredient = rawIngredients[0];

    const prepTime = dom.window.document
      .querySelectorAll("[class*='prep-time']")[0]
      .textContent.trim()
      .split(":")[1];

    const cookTime = dom.window.document
      .querySelectorAll("[class*='cook-time']")[0]
      .textContent.trim()
      .split(":")[1];

    const totalTime = dom.window.document
      .querySelectorAll("[class*='total-time']")[0]
      .textContent.trim()
      .split(":")[1];

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll("[id*='mntl-sc-block']"),
      child => {
        if (child.textContent.trim() !== "") {
          return { "@type": "HowToStep", text: child.textContent.trim() };
        } else {
          return null;
        }
      }
    ).filter(c => c !== null);

    const recipeYield = dom.window.document
      .querySelectorAll("[class*='recipe-yield']")[0]
      .textContent.split(":")[1];

    const name = dom.window.document.querySelectorAll(
      "[class='heading__title']"
    )[0].textContent;

    const image = dom.window.document.querySelectorAll(
      "[class='img-placeholder']"
    )[0].children[0].src;

    const recipe = {
      name,
      author: "The Spruce Eats",
      image: [image],
      url: recipe_url,
      recipeYield,
      recipeIngredient,
      recipeInstructions,
      footNotes: [],
      prepTime,
      cookTime,
      totalTime,
      recipeCategory: [],
      recipeCuisine: []
    };
    console.log(2);
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

module.exports = spruceeats;
