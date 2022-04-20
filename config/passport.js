const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/GoogleUser");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1007060890405-pfla67r9h7is3cessh5cdved25bnamub.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
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
