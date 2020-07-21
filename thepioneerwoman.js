const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const thepioneerwoman = async recipe_url => {
  try {
    console.log("RUNNING thepioneerwoman");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='recipeIngredient']")
    ).map(cn => cn.textContent.trim());

    let recipeIngredient = rawIngredients;
    console.log(" recipeIngredient:", recipeIngredient);
    const prepTime = dom.window.document.querySelector("[itemprop*='prepTime']")
      .textContent;

    const cookTime = dom.window.document.querySelector("[itemprop*='cookTime']")
      .textContent;

    const totalTime = "";

    console.log(" times:", prepTime, cookTime, totalTime);

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='recipeInstructions']")
    ).map(cn => {
      if (cn.textContent.trim() !== "") {
        return { "@type": "HowToStep", text: cn.textContent.trim() };
      } else {
        return null;
      }
    });

    console.log(" recipeInstructions:", recipeInstructions);
    const recipeYield = dom.window.document.querySelector(
      '[itemprop="recipeYield"]'
    ).textContent;

    console.log(" recipeYield :", recipeYield);

    const name = dom.window.document.querySelector('[itemprop="name"]')
      .textContent;

    console.log(" name :", name);
    const image = [
      dom.window.document.querySelector("[itemprop*='image']").content
    ];

    console.log(" image :", image);

    const author = dom.window.document.querySelector('[itemprop="author"]')
      .textContent;

    console.log(" author :", author);

    const recipeCategory = dom.window.document.querySelector(
      '[itemprop="recipeCategory"]'
    ).textContent;

    console.log(" recipeCategory :", recipeCategory);

    const recipe = {
      name,
      author,
      image,
      url: recipe_url,
      recipeYield,
      recipeIngredient,
      recipeInstructions,
      prepTime,
      cookTime,
      totalTime,
      recipeCategory,
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

module.exports = thepioneerwoman;
