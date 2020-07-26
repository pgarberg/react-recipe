const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe");

const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(cors());

mongoose.connect("mongodb://localhost:27017/react-recipes", {
  useNewUrlParser: true,
});

app.get("/", async (req, res) => {
  console.log("Receiving a get request!");
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.json({
      msg: "Error Occurred",
      error,
    });
  }
});

app.get("/create", async (req, res) => {
  const recipe_url = "https://www.tasteofhome.com/recipes/chicken-quesadillas/";

  try {
    axios.get(recipe_url).then((resp) => {
      const dom = new JSDOM(resp.data);
      const ingredients = Array.from(
        dom.window.document.querySelectorAll("[itemprop*='ingredients']"),
        (cn) => cn.textContent
      );

      const allObj = {};

      const all = Array.from(
        dom.window.document.querySelectorAll("[itemprop]"),
        (cn) => {
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
                (ccn) => {
                  return { "@type": "HowToStep", text: ccn.textContent };
                }
              );
              break;
            default:
              break;
          }
        }
      );

      allObj["recipeIngredient"] = ingredients;
      allObj["author"] = "Damn Delicious";
      allObj["url"] = recipe_url;
      console.log("ALL LENGTH:", all.length);
      console.log("ALL:", allObj);
      //   const prepTime = dom.window.document.querySelectorAll(
      //     "[itemprop*='prepTime']"
      //   )[0].textContent;

      //   const cookTime = dom.window.document.querySelectorAll(
      //     "[itemprop*='cookTime']"
      //   )[0].textContent;

      //   const totalTime = dom.window.document.querySelectorAll(
      //     "[itemprop*='totalTime']"
      //   )[0].textContent;

      //   const rawTimes = {
      //     prepTime,
      //     cookTime,
      //     totalTime
      //   };

      //   const recipeDirections = Array.from(
      //     dom.window.document.querySelectorAll(
      //       "[class*='recipe-directions__list--item']"
      //     ),
      //     child => {
      //       if (child.textContent.trim() !== "") {
      //         return child.textContent.trim();
      //       } else {
      //         return null;
      //       }
      //     }
      //   ).filter(c => c !== null);

      //   const footNotes = Array.from(
      //     dom.window.document.querySelectorAll("[class*='recipe-footnotes'] ul")
      //   )
      //     .map(child => child.textContent)
      //     .filter(c => c !== "Partner Tip");

      //   const servings = dom.window.document.querySelectorAll(
      //     "[id='servings']"
      //   )[0].value;

      //   const name = dom.window.document.querySelectorAll(
      //     "[class='recipe-summary__h1']"
      //   )[0].textContent;

      //   const photo = dom.window.document.querySelectorAll(
      //     "[class='rec-photo']"
      //   )[0].src;

      //   const recipe = {
      //     name,
      //     author: "AllRecipes",
      //     photo,
      //     url: recipe_url,
      //     servings,
      //     ingredients,
      //     recipeDirections,
      //     footNotes,
      //     rawTimes
      //   };

      Recipe.create(allObj);

      res.json({
        status: 200,
        msg: "Recipe Successfully Created",
        recipe: allObj,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen("4000", () => {
  console.log("App is up and running on 4000");
});
