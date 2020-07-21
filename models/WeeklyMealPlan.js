const mongoose = require("mongoose");
const Recipe = require("./Recipe");

const RecipeSchema = mongoose.model("Recipe").schema;

const weeklyMealPlanSchema = new mongoose.Schema({
  monday: [RecipeSchema],
  tuesday: [RecipeSchema],
  wednesday: [RecipeSchema],
  thursday: [RecipeSchema],
  friday: [RecipeSchema],
  saturday: [RecipeSchema],
  sunday: [RecipeSchema],
});

const WeeklyMealPlan = mongoose.model("WeeklyMealPlan", weeklyMealPlanSchema);

module.exports = WeeklyMealPlan;
