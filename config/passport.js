const bcrypt = require("bcrypt");

const passport = require("passport");

const TestUser = require("../models/TestUser");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (username, password, cb) {
      TestUser.findOne({ email: username }, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        const didPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!didPasswordMatch) {
          return cb(null, false);
        }
        return cb(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log("CALLING SU");
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  console.log("CALLING DU");
  TestUser.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
