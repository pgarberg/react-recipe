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
};

exports.getFavourites = async (req, res) => {
  console.log("Receiving a get request for /recipes/favourites...");
  const { userID } = req.params;
  try {
    const user = await User.findById(userID).populate("favourites");
    const { favourites } = user;

    res.json({ status: 200, msg: "Success", favourites });
  } catch (error) {
    res.json({
      status: 400,
      msg: "Error Occurred",
      error,
    });
  }
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

exports.toggleFavourite = async (req, res) => {
  try {
    const { id, userID } = req.params;

    const recipe = await Recipe.findById(id).populate("user");

    console.log("recipe", recipe);
    console.log("id", id);
    console.log("userID", userID);
    if (userID.toString() === recipe.user._id.toString()) {
      console.log("Made it to here");
      const toggled = recipe.favourite === true ? false : true;

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { favourite: toggled },
        {
          new: true,
        }
      );
      return res.json({ status: 200, msg: "Success", recipe: updatedRecipe });
    }
    res.json({
      status: 400,
      msg: "Recipe Not Updated",
    });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.updateRecipeByID = async (req, res) => {
  try {
    const { id, userID } = req.params;
    const recipeUpdates = req.body;

    const recipe = await Recipe.findById(id).populate("user");

    if (userID.toString() === recipe.user._id.toString()) {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipeUpdates, {
        new: true,
      });
      return res.json({ status: 200, msg: "Success", recipe: updatedRecipe });
    }
    res.json({
      status: 400,
      msg: "Recipe Not Updated",
    });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.deleteRecipeByID = async (req, res) => {
  try {
    const { userID, id } = req.params;

    const recipe = await Recipe.findById(id).populate("user");

    if (userID.toString() === recipe.user._id.toString()) {
      const tryDelete = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { recipes: { _id: id } } }
      );

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
      recipe.user = user;
      const createdRecipe = await Recipe.create(recipe);

      User.findByIdAndUpdate(
        userID,
        { $push: { recipes: createdRecipe } },
        (error, success) => {
          if (error) {
            res.json({
              status: 400,
              msg: "An Error Occurred When Creating Recipe",
              error,
              recipe,
            });
          } else {
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
