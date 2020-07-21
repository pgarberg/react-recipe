const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const allrecipes = async recipe_url => {
  try {
    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[id*='lst_ing']")
    ).map(cn => Array.from(cn.children).map(child => child.textContent.trim()));

    const recipeIngredient = [];

    rawIngredients.map(children =>
      children.map(child => {
        child !== "Add all ingredients to list" && child !== ""
          ? recipeIngredient.push(child)
          : null;
      })
    );

    const prepTime = dom.window.document.querySelectorAll(
      "[itemprop*='prepTime']"
    )[0].textContent;

    const cookTime = dom.window.document.querySelectorAll(
      "[itemprop*='cookTime']"
    )[0].textContent;

    const totalTime = dom.window.document.querySelectorAll(
      "[itemprop*='totalTime']"
    )[0].textContent;

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll(
        "[class*='recipe-directions__list--item']"
      ),
      child => {
        if (child.textContent.trim() !== "") {
          return { "@type": "HowToStep", text: child.textContent.trim() };
        } else {
          return null;
        }
      }
    ).filter(c => c !== null);

    const footNotes = Array.from(
      dom.window.document.querySelectorAll("[class*='recipe-footnotes'] ul")
    )
      .map(child => child.textContent)
      .filter(c => c !== "Partner Tip");

    const recipeYield = dom.window.document.querySelectorAll(
      "[id='servings']"
    )[0].value;

    const name = dom.window.document.querySelectorAll(
      "[class='recipe-summary__h1']"
    )[0].textContent;

    const image = dom.window.document.querySelectorAll("[class='rec-photo']")[0]
      .src;
    console.log(1);
    const recipe = {
      name,
      author: "AllRecipes",
      image: [image],
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

module.exports = allrecipes;
