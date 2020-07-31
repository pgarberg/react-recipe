const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const Collection = mongoose.model("Collection", CollectionSchema);

module.exports = Collection;
