const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  monday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  tuesday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  wednesday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  thursday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  friday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  saturday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  sunday: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

module.exports = MealPlan;
