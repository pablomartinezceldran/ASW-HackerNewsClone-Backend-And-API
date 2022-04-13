var express = require("express");
var router = express.Router();

const submissionController = require("../controller/submissionController");
const userController = require("../controller/userController");

router.get("/", submissionController.mostrarIndex);

router.get("/newest", submissionController.mostrarNewest);

router.get("/submit", submissionController.mostrarSubmissionForm);

router.post("/create", submissionController.createSubmisson);

router.get("/submission/:id", submissionController.mostrarSubmission);

router.get("/login", userController.mostrarForm);

module.exports = router;
