var express = require("express");
var router = express.Router();

const submissionController = require("../controller/submissionController");

const redirectLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

router.get("/", submissionController.mostrarIndex);

router.get("/newest", submissionController.mostrarNewest);

router.get(
  "/submit",
  redirectLogin,
  submissionController.mostrarSubmissionForm
);

router.post("/submit", submissionController.createSubmisson);

router.get("/submission/:id", submissionController.mostrarSubmission);

router.post('/like/:id', submissionController.donalike);

router.post('/unlike/:id', submissionController.treulike);





module.exports = router;
