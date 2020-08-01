const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  author: String,
  datePublished: String,
  image: [{ type: String }],
  recipeYield: String,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  recipeIngredient: [{ type: String }],
  recipeInstructions: [{ "@type": String, text: String }],
  recipeCategory: [String],
  recipeCuisine: [String],
  url: String,
  recipeNotes: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
