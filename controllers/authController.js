const TestUser = require("../models/TestUser");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.localLogin = (req, res, next) => {
  console.log("REQ BODY : ", req.body);
  passport.authenticate("local", function (err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        status: 400,
        error: "Invalid Credentials.",
        user: null,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.json({ status: 500, error: err, user: null });
      }
      return res.json({
        status: 200,
        message: "Login Successful",
        user: { _id: user._id, email: user.email },
      });
    });
  })(req, res, next);
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

  const createdUser = await TestUser.create(user).select("-password");

  res.json({
    status: 200,
    user: createdUser,
  });
};
