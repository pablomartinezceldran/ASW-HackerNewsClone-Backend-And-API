var express = require("express");
const { redirect } = require("express/lib/response");
var router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

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

router.get("/login", ensureGuest, userController.mostrarFormLogin);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.post("/login", ensureGuest, userController.iniciaSessio);

router.get("/signup", loggedIn, userController.mostrarFormSignup);

router.post("/signup", loggedIn, userController.createUser);

router.get("/user/:id", userController.mostrarUser);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user= req.user;
    res.redirect("/");
    console.log(req);
  }
);

router.get("/user/:id/subms", userController.mostrarSubmsUser);

router.get("/user/:id/comments", userController.mostrarComsUser);

router.get("/user/:id/votedsubms", userController.mostrarLikedSubmsUser);

router.get("/user/:id/votedcomments", userController.mostrarLikedCommsUser);

module.exports = router;
