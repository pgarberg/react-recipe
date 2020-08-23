const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mealplan: {
    monday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    tuesday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    wednesday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    thursday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    friday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    saturday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
    sunday: [{ type: Schema.Types.ObjectId, ref: "Recipe", require: false }],
  },
});

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

module.exports = MealPlan;
