const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const nytimes = async recipe_url => {
  try {
    console.log("RUNNING NYTIMES");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='recipeIngredient']")
    ).map(cn => Array.from(cn.children).map(child => child.textContent.trim()));

    const recipeIngredient = rawIngredients.map(child => child.join(" "));

    const prepTime = "-";

    const cookTime = "-";

    const totalTime = dom.window.document.querySelectorAll(
      "[itemprop*='cookTime']"
    )[0].content;

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='recipeInstructions']"),
      child => {
        if (child.textContent.trim() !== "") {
          return child.textContent.trim();
        } else {
          return null;
        }
      }
    )[0]
      .split("\n")
      .map(c => {
        return { "@type": "HowToStep", text: c.trim() };
      });

    const recipeYield = dom.window.document.querySelectorAll(
      "[itemprop*='recipeYield']"
    )[0].textContent;

    const name = dom.window.document
      .querySelectorAll("[itemprop='name']")[0]
      .textContent.trim();

    const image = dom.window.document.querySelectorAll("[itemprop*='image']")[0]
      .src;

    const author = dom.window.document.querySelectorAll(
      "[itemprop*='author']"
    )[0].textContent;

    const recipeCategory = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='recipeCategory']"),
      child => {
        if (child.attributes[0].nodeValue !== "") {
          return child.attributes[0].nodeValue;
        } else {
          return null;
        }
      }
    );

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
      recipeCategory,
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

module.exports = nytimes;
