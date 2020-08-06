const WeeklyMealPlan = require("../models/WeeklyMealPlan");
const User = require("../models/User");

exports.getMealPlan = async (req, res) => {
  const { userID } = req.params;

  try {
    console.log("got to here");
    const user = await User.findById(userID).populate([
      "mealPlan.monday",
      "mealPlan.tuesday",
      "mealPlan.wednesday",
      "mealPlan.thursday",
      "mealPlan.friday",
      "mealPlan.saturday",
      "mealPlan.sunday",
    ]);

    const { mealPlan } = user;

    res.json({ status: 200, msg: "Successfully Fetched MealPlan", mealPlan });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.createMealPlan = async (req, res) => {
  const { userID } = req.params;
  const { mealplan } = req.body;
  if (userID && mealplan) {
    try {
      const user = await User.findByIdAndUpdate(
        userID,
        {
          $push: { savedPlans: mealplan },
        },
        {
          new: true,
        }
      );

      res.json({
        status: 200,
        msg: "Meal Plan Successfully Created",
        savedPlans: user.savedPlans,
      });
    } catch (error) {
      res.json({ status: 500, msg: "Server Error", error });
    }
  } else {
    res.json({
      status: 500,
      msg: "Server Error",
      error: "Information Undefined",
    });
  }
};

exports.updateMealPlan = async (req, res) => {
  console.log("HERE IN UPDATE MEAL PLAN");

  const { userID } = req.params;
  const { recipe, dayKey } = req.body;
  const { recipeID } = req.body;

  if (recipeID) {
    console.log("WE   WILL   TRY   TO   DELETE  RECIPE   FROM   MEAL   PLAN");
    try {
      const user = await User.findById(userID);
      let mealplan = user.mealPlan;
      const containsRecipe = mealplan[dayKey].includes(recipeID);

      if (!containsRecipe) {
        console.log("APPARENTLY DOESNT CONTAIN");
        return res.json({
          status: 400,
          msg: "The requested recipe cannot be deleted from the specified day.",
        });
      }

      mealplan[dayKey] = mealplan[dayKey].filter(
        (recipeid) => recipeid.toString() !== recipeID.toString()
      );

      const updatedUser = await User.findByIdAndUpdate(
        userID,
        { mealPlan: mealplan },
        {
          new: true,
        }
      );

      return res.json({
        status: 200,
        msg: "Successfully Updated Meal Plan",
        mealPlan: updatedUser.mealPlan,
      });
    } catch (error) {}
  }

  try {
    const user = await User.findById(userID);

    let mealplan = user.mealPlan;

    if (mealplan[dayKey].includes(recipe._id)) {
      return res.json({
        status: 400,
        msg: "Meal Plan Already Contains Recipe",
      });
    }
    if (mealplan[dayKey].length < 5) {
      mealplan[dayKey].push(recipe);
    } else {
      mealplan[dayKey].shift();

      mealplan[dayKey].push(recipe);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { mealPlan: mealplan },
      {
        new: true,
      }
    );

    return res.json({
      status: 200,
      msg: "Successfully Updated Meal Plan",
      mealPlan: updatedUser.mealPlan,
    });
  } catch (error) {
    res.json({ status: 500, msg: "SERVER ERROR", error });
  }
};

exports.getSavedPlans = async (req, res) => {
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
};
