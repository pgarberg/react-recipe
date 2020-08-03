const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Collection = mongoose.model("Collection", CollectionSchema);

module.exports = Collection;
