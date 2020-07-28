const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const unscrapeablesController = require("../controllers/unscrapeablesController");
const scrapeController = require("../controllers/scrapeController");
const mealplanController = require("../controllers/mealplanController");
const authController = require("../controllers/authController");

router.get("/thepioneerwoman", async (req, res) => {
  const recipe = await thepioneerwoman(
    "https://thepioneerwoman.com/cooking/rosemary-garlic-fried-potatoes/"
  );

  res.json(recipe);
});

//AUTH RELATED ROUTES
router.post("/auth/local", authController.localLogin);

router.get("/auth/google", authController.googleLogin);

router.get("/auth/peder", (req, res) => {
  console.log("SOMEONE CALLING AUTH PEDER");
  res.json({ msg: "HI" });
});

router.get("/auth/google/callback", authController.googleCallback);

router.post("/auth/register", authController.registerUser);

//RECIPES RELATED ROUTES
router.get("/recipes", recipesController.getRecipes);

router.delete("/recipe/:id", recipesController.deleteRecipeByID);

router.post("/recipe/create", recipesController.createRecipe);

router.get("/recipe/:id", recipesController.getRecipeByID);

router.patch("/recipe/:id", recipesController.updateRecipeByID);

//PATCH ROUTE TO FIX RECIPES WHICH DID NOT HAVE RECIPENOTES ORIGINALLY - Potentially outdated. Fix with default value in future?
//07-24-20
// router.get("/addNotes", async (req, res) => {
//   const recipes = await Recipe.find();

//   recipes.map(async (recipe) => {
//     await Recipe.findByIdAndUpdate(recipe._id, { recipeNotes: [] });
//   });

//   res.send("Updated");
// });

//
//UNSCRAPABLE SITE RELATED ROUTES
//
router.get("/unscrapeables", unscrapeablesController.getUnscrapeables);

//
//WEBSITE SCRAPING RELATED ROUTES
//
router.post("/scrape", scrapeController.scrape);

//
//MEAL PLAN RELATED ROUTES
//
router.get("/mealplan", mealplanController.getMealPlan);

router.patch("/mealplan", mealplanController.updateMealPlan);

router.post("/mealplan", mealplanController.createMealPlan);

module.exports = router;
