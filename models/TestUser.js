const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testUserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleID: {
    type: String,
  },
});

const TestUser = mongoose.model("TestUser", testUserSchema);

module.exports = TestUser;
