const bcrypt = require("bcrypt");

const passport = require("passport");

const TestUser = require("../models/TestUser");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("PROFILE : ", profile._json.email);
      const emailLinked = await TestUser.findOne({
        email: profile._json.email,
      });
      console.log("EMAIL LINKED : ", emailLinked);
      if (emailLinked) {
        console.log("EMAIL LINKED TRUE!!");
        if (emailLinked && emailLinked.googleID) {
          console.log("Email and Google ID");
          return done(null, emailLinked);
        }
        console.log("MUST UPDATE USER");
        let updatedUser = await TestUser.findOneAndUpdate(
          { email: profile._json.email },
          { googleID: profile.id }
        );
        console.log("UPDATED USER : ", updatedUser);
        return done(null, updatedUser);
      }

      const googleUser = await TestUser.findOne({ googleID: profile.id });

      if (googleUser) {
        if (googleUser.email) {
          return done(null, googleUser);
        }

        let updatedUser = await TestUser.findOneAndUpdate(
          { googleID: profile.id },
          { email: profile._json.email }
        );
        return done(null, updatedUser);
      }

      const user = await TestUser.create({ googleID: profile.id });
      done(null, user);
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
  console.log("CALLING SU :", user._id);
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  console.log("CALLING DU :", id);
  TestUser.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    console.log("USER NO ERRORS : ", user);
    cb(null, user);
  });
});
