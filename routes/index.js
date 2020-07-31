const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const unscrapeablesController = require("../controllers/unscrapeablesController");
const scrapeController = require("../controllers/scrapeController");
const mealplanController = require("../controllers/mealplanController");
const authController = require("../controllers/authController");
const passport = require("passport");

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

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/auth/register", authController.registerUser);

router.get("/api/current-user", authController.currentUser);

router.get("/api/logout", authController.logout);

//RECIPES RELATED ROUTES
router.get("/api/recipes", recipesController.getRecipes);

router.delete("/api/recipe/:id", recipesController.deleteRecipeByID);

router.post("/api/recipe/create", recipesController.createRecipe);

router.get("/api/recipe/:id", recipesController.getRecipeByID);

router.patch("/api/recipe/:id", recipesController.updateRecipeByID);

//
//UNSCRAPABLE SITE RELATED ROUTES
//
router.get("/api/unscrapeables", unscrapeablesController.getUnscrapeables);

//
//WEBSITE SCRAPING RELATED ROUTES
//
router.post("/api/scrape", scrapeController.scrape);

//
//MEAL PLAN RELATED ROUTES
//
router.get("/api/mealplan", mealplanController.getMealPlan);

router.patch("/api/mealplan", mealplanController.updateMealPlan);

router.post("/api/mealplan", mealplanController.createMealPlan);

module.exports = router;
