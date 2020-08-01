const Recipe = require("../models/Recipe");

const User = require("../models/User");

const MealPlan = require("../models/MealPlan");

const Collection = require("../models/Collection");

const bcrypt = require("bcrypt");

exports.seedData = async (req, res) => {
  console.log("SEED DATA");

  const hashedPassword = bcrypt.hashSync("dog", 10);

  const user = await User.create({
    email: "leon@gmail.com",
    password: hashedPassword,
  });

  const recipes = await Recipe.find();

  await User.findOneAndUpdate({ _id: user._id }, { favourites: recipes });

  res.send("DATA SUCCESSFULLY SEEDED!");
};

exports.getRecipes = async (req, res) => {
  console.log("Receiving a get request for /recipes...");
  const { userID } = req.params;
  try {
    const user = await User.findById(userID).populate("recipes");
    const { recipes } = user;

    res.json({ status: 200, msg: "Success", recipes });
  } catch (error) {
    res.json({
      status: 400,
      msg: "Error Occurred",
      error,
    });
  }
};

exports.getRecipeByID = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json({ status: 200, msg: "Success", recipe });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.updateRecipeByID = async (req, res) => {
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
};

exports.deleteRecipeByID = async (req, res) => {
  const { userID, id } = req.params;
  try {
    console.log("Receiving a request to delete recipe...");
    const recipe = await Recipe.findById(id);
    if (userID === recipe.user._id) {
      const deleted = await Recipe.findByIdAndDelete(id);
      if (deleted) {
        res.json({
          status: 200,
          msg: "Recipe Successfully Deleted",
          recipe: deleted,
        });
      } else {
        res.json({
          status: 400,
          msg: "Recipe Not Deleted",
        });
      }
    } else {
      res.json({
        status: 400,
        msg: "You do not have permission to delete this recipe.",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      msg: "Something Went Wrong",
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { recipe } = req.body;
    const { userID } = req.params;

    const user = await User.findById(userID);

    if (user) {
      console.log("Creating Recipe");
      recipe.user = user;
      const createdRecipe = await Recipe.create(recipe);

      console.log("Recipe Created");

      User.findByIdAndUpdate(
        userID,
        { $push: { recipes: createdRecipe } },
        (error, success) => {
          if (error) {
            console.log("AN E-ROR");
            res.json({
              status: 400,
              msg: "An Error Occurred When Creating Recipe",
              error,
              recipe,
            });
          } else {
            console.log("NO E-rOR");
            res.json({
              status: 200,
              msg: "Recipe Successfully Created",
              recipe: createdRecipe,
            });
          }
        }
      );
    } else {
      console.log("hi from way down here");
      res.json({
        status: 400,
        msg: "An Error Occurred When Creating Recipe",
        recipe,
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      msg: "An Error Occurred When Creating Recipe",
      recipe,
    });
  }
};
