const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const damndelicious = async recipe_url => {
  try {
    console.log("AT LEAST WE ARE HERE");
    console.log("RECIPURL", recipe_url);
    const resp = await axios.get(recipe_url);

    const dom = new JSDOM(resp.data);
    const ingredients = Array.from(
      dom.window.document.querySelectorAll("[itemprop*='ingredients']"),
      cn => cn.textContent
    );

    let allObj = {};

    Array.from(dom.window.document.querySelectorAll("[itemprop]"), cn => {
      switch (cn.getAttribute("itemprop")) {
        case "name":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "description":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "datePublished":
          allObj[cn.getAttribute("itemprop")] = cn.getAttribute("content");
          break;
        case "recipeCategory":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "recipeCuisine":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "recipeYield":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "prepTime":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "cookTime":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "author":
          allObj[cn.getAttribute("itemprop")] = cn.textContent.trim();
          break;
        case "image":
          allObj[cn.getAttribute("itemprop")] = [cn.getAttribute("src")];
          break;
        case "recipeInstructions":
          allObj[cn.getAttribute("itemprop")] = Array.from(
            cn.children[0].children,
            ccn => {
              return { "@type": "HowToStep", text: ccn.textContent };
            }
          );
          break;
        default:
          break;
      }
    });

    allObj["recipeIngredient"] = ingredients;
    allObj["author"] = "Damn Delicious";
    allObj["url"] = recipe_url;

    return {
      status: 200,
      msg: "Recipe Successfully Created",
      recipe: allObj
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

module.exports = damndelicious;
