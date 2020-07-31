const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  favourites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  savedPlans: [{ type: Schema.Types.ObjectId, ref: "MealPlan" }],
  mealPlan: { type: Schema.Types.ObjectId, ref: "MealPlan" },
});

const User = mongoose.model("User", userSchema);
