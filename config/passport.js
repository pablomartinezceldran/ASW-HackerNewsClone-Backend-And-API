const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1007060890405-pfla67r9h7is3cessh5cdved25bnamub.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL:
          "https://serene-peak-25231.herokuapp.com/auth/google/callback",
        // "http://localhost:3000/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          password: "1234",
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
