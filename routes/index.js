const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const unscrapeablesController = require("../controllers/unscrapeablesController");
const scrapeController = require("../controllers/scrapeController");
const mealplanController = require("../controllers/mealplanController");
const collectionsController = require("../controllers/collectionsController");
const authController = require("../controllers/authController");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const User = require("../models/User");
const Recipe = require("../models/Recipe");

cloudinary.config({
  cloud_name: "dosuijqan",
  api_key: "487745778112622",
  api_secret: "edwvBHTLEMNINJr_BJ0O_URuYtk",
});

router.get("/thepioneerwoman", async (req, res) => {
  const recipe = await thepioneerwoman(
    "https://thepioneerwoman.com/cooking/rosemary-garlic-fried-potatoes/"
  );

  res.json(recipe);
});

//SEED DATA ROUTES

router.get("/api/seed/cloudimages/:id", async (req, res) => {
  try {
    const uploadCloudImages = async () => {
      const recipe = await Recipe.findById(req.params.id);

      const cloudArray = await Promise.all(
        recipe.image.map(async (i) => {
          const uploadedResponse = await cloudinary.uploader.upload(
            i,
            {
              upload_preset: "reactive-recipes",
            },
            function (error, result) {
              console.log(result, error);
            }
          );
          console.log("uploadedResponse.public_id", uploadedResponse.public_id);
          return uploadedResponse.public_id;
        })
      );
      console.log("cloudArray", cloudArray);
      return cloudArray;
    };

    const cloudImage = await uploadCloudImages();

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
      cloudImage,
    });

    res.json({ status: 200, msg: "Success", updatedRecipe });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
});

router.get("/api/seed/cloudimages", async (req, res) => {
  try {
    const recipes = await Recipe.find();

    const uploadCloudImages = async (recipe) => {
      const cloudArray = await Promise.all(
        recipe.image.map(async (i) => {
          const uploadedResponse = await cloudinary.uploader.upload(
            i,
            {
              upload_preset: "reactive-recipes",
            },
            function (error, result) {
              console.log(result, error);
            }
          );
          console.log("uploadedResponse.public_id", uploadedResponse.public_id);
          return uploadedResponse.public_id;
        })
      );
      console.log("cloudArray", cloudArray);
      return cloudArray;
    };

    recipes.map(async (recipe) => {
      const cloudImage = await uploadCloudImages(recipe);

      const updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, {
        cloudImage,
      });
    });

    res.json({ status: 200, msg: "Success" });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
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

//
//RECIPES RELATED ROUTES
//

router.get("/api/seed-data", recipesController.seedData);

router.get("/api/:userID/recipes/favourites", recipesController.getFavourites);

router.get("/api/:userID/recipes", recipesController.getRecipes);

router.delete("/api/:userID/recipe/:id", recipesController.deleteRecipeByID);

router.get(
  "/api/:userID/recipe/:id/favourite",
  recipesController.toggleFavourite
);

router.post("/api/:userID/recipe/create", recipesController.createRecipe);

router.get("/api/recipe/:id", recipesController.getRecipeByID);

router.patch("/api/:userID/recipe/:id", recipesController.updateRecipeByID);

//
//RECIPE COLLECTIONS RELATED ROUTES
//
router.get("/api/:userID/collections", collectionsController.getCollections);

router.delete(
  "/api/:userID/collection/:id",
  collectionsController.deleteCollectionByID
);

router.post(
  "/api/:userID/collections/create",
  collectionsController.createCollection
);

router.get(
  "/api/:userID/collection/:id",
  collectionsController.getCollectionByID
);

router.patch(
  "/api/:userID/collection/:id",
  collectionsController.removeRecipeFromCollection
);

router.post(
  "/api/:userID/collection/:id",
  collectionsController.addRecipeToCollection
);

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
router.get("/api/:userID/mealplan", mealplanController.getMealPlan);

router.patch("/api/:userID/mealplan", mealplanController.updateMealPlan);

router.post("/api/:userID/mealplan", mealplanController.createMealPlan);

router.get("/api/:userID/savedplans", mealplanController.getSavedPlans);

router.delete("/api/:userID/mealplan", mealplanController.clearMealPlan);

// router.post("/api/:userID/savedplans", mealplanController.addSavedPlan);

// router.patch(
//   "/api/:userID/savedplans/:planID",
//   mealplanController.updateSavedPlan
// );

// router.delete(
//   "/api/:userID/savedplans/:planID",
//   mealplanController.deleteSavedPlan
// );

module.exports = router;
