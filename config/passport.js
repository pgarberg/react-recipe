const bcrypt = require("bcrypt");

const passport = require("passport");

const TestUser = require("../models/TestUser");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "389768619722-s02sbv3ug7e7mjbeglmeku9kt96sj0nl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "y2nZ9rwxurYkPXPrM8Bv8IeC";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

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
