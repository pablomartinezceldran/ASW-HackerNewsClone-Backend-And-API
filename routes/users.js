var express = require('express');
var router = express.Router();

const userController = require("../controller/userController");


router.get("/login", userController.mostrarForm);

router.post("/login", userController.createUser);

module.exports = router;
