const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jackofallscrapers = require("../jackofallscrapers");
const allrecipes = require("../allrecipes");
const damndelicious = require("../damndelicious");
const spruceeats = require("../spruceeats");
const nytimes = require("../nytimes");
const saveur = require("../saveur");
const pinchofyum = require("../pinchofyum");
const thepioneerwoman = require("../thepioneerwoman");

const NonScrapeable = require("../models/NonScrapeable");

exports.scrape = async (req, res) => {
  console.log("Getting /post request to Scrape Website");

  const { url } = req.body;
  console.log("URL:", url);

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
};
