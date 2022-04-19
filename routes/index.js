var express = require("express");
var router = express.Router();

const submissionController = require("../controller/submissionController");
const commentController = require("../controller/commentController");

const redirectLogin = (req, res, next) => {
  if (!req.session.user) {
    console.log('xdddd');
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

router.get("/submission/:id", submissionController.mostrarSubmissionTree);

router.post('/like/:id', redirectLogin, submissionController.donalike);

router.post('/unlike/:id', redirectLogin, submissionController.treulike);

router.get('/comments', commentController.mostrarNewestComment);

router.post('/submission/:id', redirectLogin, commentController.createComment);

router.get("/comment/:id", commentController.mostrarReplyForm);

router.post("/comment/:id", redirectLogin, commentController.createReply);





module.exports = router;
