const WeeklyMealPlan = require("../models/WeeklyMealPlan");

exports.getMealPlan = async (req, res) => {
  try {
    const mealplan = await WeeklyMealPlan.findById("5e922c6e8f91f14fd49d9fa1");

    res.json({ status: 200, msg: "Successfully Fetched MealPlan", mealplan });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.createMealPlan = async (req, res) => {
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
};

exports.updateMealPlan = async (req, res) => {
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
