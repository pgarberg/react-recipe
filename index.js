const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe");
const NonScrapeable = require("./models/NonScrapeable");
const WeeklyMealPlan = require("./models/WeeklyMealPlan");

const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dotenv = require("dotenv");

const jackofallscrapers = require("./jackofallscrapers");
const allrecipes = require("./allrecipes");
const damndelicious = require("./damndelicious");
const spruceeats = require("./spruceeats");
const nytimes = require("./nytimes");
const saveur = require("./saveur");
const pinchofyum = require("./pinchofyum");
const thepioneerwoman = require("./thepioneerwoman");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

app.get("/thepioneerwoman", async (req, res) => {
  const recipe = await thepioneerwoman(
    "https://thepioneerwoman.com/cooking/rosemary-garlic-fried-potatoes/"
  );

  res.json(recipe);
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

app.get("/unscrapeables", async (req, res) => {
  console.log("UNSCRAPABLE GET REQUEST");
  try {
    const sites = await NonScrapeable.find();
    console.log("SITE SITES", sites);
    res.json({
      status: 200,
      msg: "Unscrapeable List Request Successful",
      sites,
    });
  } catch (error) {
    res.json({
      status: 400,
      msg: "Unscrapeable List Request Unsuccessful",
      sites: [],
    });
  }
});

app.post("/scrape", async (req, res) => {
  console.log("GETTING A GET REQUEST FROM THE CLIENT!");

  const { url } = req.body;
  console.log("URL:", url);
  console.log("INCLUDES DAMN DELICIOUS?", url.includes("damndelicious"));
  let recipe;

  if (url.includes("damndelicious")) {
    console.log("CALL DAMN DELCIOUS!");
    recipe = await damndelicious(url);
  } else if (url.includes("allrecipes")) {
    console.log("CALL ALL DELCIOUS!");
    recipe = await allrecipes(url);
  } else if (url.includes("thespruceeats")) {
    console.log("CALL SPRUCE EATS!");
    recipe = await spruceeats(url);
  } else if (url.includes("nytimes")) {
    console.log("CALL NYTIMES!");
    recipe = await nytimes(url);
  } else if (url.includes("saveur")) {
    console.log("CALL SAVEUR!");
    recipe = await saveur(url);
  } else if (url.includes("pinchofyum")) {
    console.log("CALL pinchofyum!");
    recipe = await pinchofyum(url);
  } else if (url.includes("thepioneerwoman")) {
    console.log("CALL thepioneerwoman!");
    recipe = await thepioneerwoman(url);
  } else {
    console.log("CALL JACK OF ALL SCRAPERS!");
    recipe = await jackofallscrapers(url);
  }

  console.log("OUR END OF LINE RECIPE: ", recipe, recipe.recipe.url);
  if (recipe.status === 200) {
    const { url } = recipe.recipe;
    console.log("url", url);
    const list = await NonScrapeable.find();

    if (list.some((li) => url.includes(li.url))) {
      console.log("list some", "YES");
      const updateItemID = list.filter((li) => url.includes(li.url))[0]._id;
      console.log("UPDATED ID: ", updateItemID);
      const updatedItem = await NonScrapeable.findByIdAndUpdate(updateItemID, {
        schemaConstructed: true,
      });
      console.log("LIST :", list);
    }
  }

  if (recipe.status === 400) {
    const { url } = recipe;
    const list = await NonScrapeable.find();
    if (!list.some((li) => li.url === url)) {
      await NonScrapeable.create({
        url,
        schemaConstructed: false,
        numberOfAttempts: 1,
      });
    } else {
      const updateItemID = list.map((li) => {
        if (li.url === url) {
          return li._id;
        }
      });

      const numAttempts = (await NonScrapeable.findById(updateItemID))
        .numberOfAttempts;

      const updatedItem = await NonScrapeable.findByIdAndUpdate(updateItemID, {
        numberOfAttempts: numAttempts + 1,
      });
    }

    res.json(recipe);
  }

  res.json(recipe);
});

app.delete("/recipe/:id", async (req, res) => {
  try {
    console.log("RECEIVING DELETE REQUEST");
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.json({
        status: 200,
        msg: "Recipe Successfully Deleted",
        recipe,
      });
    } else {
      res.json({
        status: 400,
        msg: "Recipe Not Deleted",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      msg: "Something Went Wrong",
    });
  }
});

app.post("/create", async (req, res) => {
  const { recipe } = req.body;
  try {
    console.log("Creating Recipe");
    const rpy = new Recipe(recipe);

    console.log("Recipe Created");
    rpy.save();

    res.json({ status: 200, msg: "Recipe Successfully Created", recipe: rpy });
  } catch (error) {
    res.json({
      status: 400,
      msg: "An Error Occurred When Creating Recipe",
      recipe,
    });
  }
});

app.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json({ status: 200, msg: "Success", recipe });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
});

app.get("/addNotes", async (req, res) => {
  const recipes = await Recipe.find();

  recipes.map(async (recipe) => {
    await Recipe.findByIdAndUpdate(recipe._id, { recipeNotes: [] });
  });

  res.send("Updated");
});

app.post("/recipe/:id", async (req, res) => {
  try {
    console.log("LETS UPDATE");

    const { id } = req.params;
    console.log("ID", id);
    console.log(req.body);
    const recipe = req.body;
    console.log("RECIPE", recipe);
    await Recipe.findByIdAndUpdate(id, recipe);
    res.json({ status: 200, msg: "Success", recipe });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
});

app.get("/mealplan", async (req, res) => {
  try {
    const mealplan = await WeeklyMealPlan.findById("5e922c6e8f91f14fd49d9fa1");
    console.log("Found Meal Plan : ", mealplan);
    res.json({ status: 200, msg: "Successfully Fetched MealPlan", mealplan });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
});

app.patch("/mealplan", async (req, res) => {
  try {
    console.log("PATCHING MEAL PLAN");

    let { mealplan } = req.body;
    delete mealplan._id;

    const updated = await WeeklyMealPlan.findByIdAndUpdate(
      "5e922c6e8f91f14fd49d9fa1",
      mealplan
    );

    updated.save();
    res.json({ status: 200, msg: "Successfully Updated Meal Plan", updated });
  } catch (error) {
    res.json({ status: 500, msg: "SERVER ERROR", error });
  }
});

app.post("/mealplan", async (req, res) => {
  try {
    const { weekly } = req.body;
    console.log("WEEEEEEEEKLY MEEEEEEEEEEAL PLAAAAAAAAN : ", weekly);
    console.log("Creating Meal Plan");
    const mealplan = new WeeklyMealPlan(weekly);

    console.log("Meal Plan Created");
    mealplan.save();

    res.json({ status: 200, msg: "Meal Plan Successfully Created", mealplan });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen("4000", () => {
  console.log("App is up and running on 4000");
});
