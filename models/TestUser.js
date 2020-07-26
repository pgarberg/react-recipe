const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const TestUser = mongoose.model("TestUser", testUserSchema);

module.exports = TestUser;
