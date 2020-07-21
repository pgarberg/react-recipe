const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const saveur = async recipe_url => {
  try {
    console.log("RUNNING saveur");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[property*='recipeIngredient']")
    ).map(cn => cn.textContent.trim());

    let recipeIngredient = rawIngredients;

    const prepTime = "-";

    const cookTime = "-";

    const totalTime = dom.window.document.querySelectorAll(
      "[property*='cookTime']"
    )[0].content;

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll("[property*='recipeInstructions']"),
      child => {
        if (child.textContent.trim() !== "") {
          return { "@type": "HowToStep", text: child.textContent.trim() };
        } else {
          return null;
        }
      }
    );

    const recipeYield = dom.window.document.querySelectorAll(
      "[property*='recipeYield']"
    )[0].textContent;

    const name = dom.window.document.querySelectorAll('[class*="title"]')[0]
      .textContent;

    console.log(" name : ", name);

    const image = dom.window.document.querySelectorAll(
      'figure img[class*="image"]'
    )[0].src;

    const author = "Saveur";

    const recipe = {
      name,
      author: `NYT Cooking - ${author}`,
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

module.exports = saveur;
