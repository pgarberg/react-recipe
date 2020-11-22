const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const delish = async recipe_url => {

  try {
    console.log("RUNNING Delish");

    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const rawIngredients = Array.from(
      dom.window.document.querySelectorAll("[class*='ingredient-list']")
    ).map(cn => Array.from(cn.children).map(child => child.textContent.trim()));

    const recipeIngredient = rawIngredients[0];

    const prepTime = dom.window.document
    .querySelectorAll("[class*='prep-time']")[0]
    .textContent.trim()
    .split(":")[1].replace(/[\t|\n]/g, '').trim().split(' ').filter(l =>l).join(' ')


    const totalTime = dom.window.document
    .querySelectorAll("[class*='total-time']")[0]
    .textContent.trim()
    .split(":")[1].replace(/[\t|\n]/g, '').trim().split(' ').filter(l =>l).join(' ')

    const cookTime = () => {
        totalSplit = totalTime.split(' ')
        prepSplit = prepTime.split(' ')
        cooks = [(totalSplit[0] - prepSplit[0]), 'hours', (totalSplit[2] - prepSplit[2]), 'minutes']

        return cooks.join(' ')
    }

    const recipeInstructions = Array.from(
      dom.window.document.querySelectorAll("[class='direction-lists'] > ol > li"),
      child => {
        if (child.textContent.trim() !== "") {
          return { "@type": "HowToStep", text: child.textContent.trim() };
        } else {
          return null;
        }
      }
    ).filter(c => c !== null);

   

    const recipeYield = dom.window.document
    .querySelectorAll("[class*='recipe-details-item yields']")[0]
    .textContent.split(":")[1].replace(/[\n|\t]/g,' ').split(' ').filter(l => l).join(" ")

console.log('recipeYield', recipeYield)

const image = dom.window.document.querySelectorAll(
    "[class='lazyimage lazyload']"
  )[0].attributes['data-src'].nodeValue
  console.log('image', image)
    
    const name = dom.window.document.querySelectorAll(
        "[class='content-hed recipe-hed']"
      )[0].textContent;

    console.log('name', name)

   
      console.log('dsdhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const recipe = {
      name,
      author: "Delish",
      image: [image],
      url: recipe_url,
      recipeYield,
      recipeIngredient,
      recipeInstructions,
      footNotes: [],
      prepTime,
      cookTime: cookTime(),
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

module.exports = delish;
