const TestUser = require("../models/TestUser");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  console.log("Attempting to Login User");
  console.log("User Data : ", req.body.userData);

  const user = await TestUser.findOne({ email: req.body.userData.email });

  console.log("TEST USER : ", user);

  if (!user) {
    return res.json({
      status: 400,
      error: "User does not exist. Register new account.",
      user: null,
    });
  }

  const match = await bcrypt.compare(req.body.userData.password, user.password);

  if (!match) {
    return res.json({
      status: 400,
      error: "Supplied login information is incorrect.",
      user: null,
    });
  }

  if (match) {
    return res.json({
      status: 200,
      message: "Login Successful",
      user,
    });
  }

  res.json({
    status: 500,
    error: "Internal server error",
  });
};

exports.registerUser = async (req, res) => {
  console.log("Attempting to Register User");

  const userExists = await TestUser.findOne({ email: req.body.userData.email });

  if (userExists) {
    return res.json({
      status: 400,
      error: "User already exists.",
      user: null,
    });
  }

  if (req.body.userData.password !== req.body.userData.passwordConfirm) {
    return res.json({
      status: 400,
      error: "Passwords must match.",
      user: null,
    });
  }

  let user = req.body.userData;

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  user.password = hashedPassword;

  const createdUser = await TestUser.create(user);

  res.json({
    status: 200,
    user: createdUser,
  });
};
