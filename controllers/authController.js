const TestUser = require("../models/TestUser");

exports.loginUser = async (req, res) => {
  console.log("Attempting to Login User");
  console.log("User Data : ", req.body.userData);

  const user = await TestUser.findOne({ email: req.body.userData.email });

  console.log("TEST USER : ", user);

  if (!user) {
    return res.json({
      status: 400,
      error: "Supplied login information is incorrect.",
      user: null,
    });
  }

  if (user.password !== req.body.userData.password) {
    return res.json({
      status: 400,
      error: "Supplied login information is incorrect.",
      user: null,
    });
  }

  if (user.password === req.body.userData.password) {
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
      error: "User already exists",
      user: null,
    });
  }
  const tested = await TestUser.create(req.body.userData);

  res.json({
    status: 200,
    user: tested,
  });
};
