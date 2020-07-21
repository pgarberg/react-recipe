const mongoose = require("mongoose");

const NonScrapeableSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  schemaConstructed: {
    type: Boolean,
    required: true
  },
  numberOfAttempts: {
    type: Number,
    required: true
  }
});

const NonScrapeable = mongoose.model("NonScrapeable", NonScrapeableSchema);

module.exports = NonScrapeable;
