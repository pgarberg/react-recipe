const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  console.log("Receiving a get request for /recipes...");
  try {
    const recipes = await Recipe.find();

    res.json(recipes);
  } catch (error) {
    res.json({
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
  try {
    console.log("Receiving a request to delete recipe...");
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
};

exports.createRecipe = async (req, res) => {
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
};
