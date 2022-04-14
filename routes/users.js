var express = require('express');
var router = express.Router();

const userController = require("../controller/userController");


router.get("/login", userController.mostrarFormLogin);

router.post("/login", userController.createUser);

router.get("/signin", userController.mostrarFormSignin);

router.post("/signin", userController.createUser);

module.exports = router;
