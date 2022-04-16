var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

const loggedIn = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/login", loggedIn, userController.mostrarFormLogin);

router.get("/logout", userController.tancarSessio);

router.post("/login", loggedIn, userController.iniciaSessio);

router.get("/signup", loggedIn, userController.mostrarFormSignup);

router.post("/signup", loggedIn, userController.createUser);

module.exports = router;
