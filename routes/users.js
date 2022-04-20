var express = require("express");
const { redirect } = require("express/lib/response");
var router = express.Router();

const passport = require("passport");

const userController = require("../controller/userController");

const loggedIn = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

const auth = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.username == req.params.id) {
      next();
    } else
      res.render("error", {
        error_mes: "No esta permitido entrar",
      });
  } else {
    res.redirect("/login");
  }
};

router.get("/login", loggedIn, userController.mostrarFormLogin);

router.get("/logout", userController.tancarSessio);

router.post("/login", loggedIn, userController.iniciaSessio);

router.get("/signup", loggedIn, userController.mostrarFormSignup);

router.post("/signup", loggedIn, userController.createUser);

router.get("/user/:id", auth, userController.mostrarUser);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/newsest");
  }
);

module.exports = router;
