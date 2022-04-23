var express = require("express");
var router = express.Router();

const submissionController = require("../controller/submissionController");
const commentController = require("../controller/commentController");

const redirectLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
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

router.get("/", submissionController.mostrarIndex);

router.get("/newest", submissionController.mostrarNewest);

router.get(
  "/submit",
  redirectLogin,
  submissionController.mostrarSubmissionForm
);

router.post("/submit", submissionController.createSubmisson);

router.get("/ask", submissionController.mostrarAsk);

router.get("/submission/:id", submissionController.mostrarSubmissionTree);

router.post("/like/:id", redirectLogin, submissionController.donalike);

router.post('/like/:id', redirectLogin, submissionController.donalike);
router.post('/likeNew/:id', redirectLogin, submissionController.donalikeNew);
router.post('/likeSub/:id', redirectLogin, submissionController.donalikeSub);
router.post('/likeCom/:id', redirectLogin, submissionController.donalikeCom);
router.post('/likeAsk/:id', redirectLogin, submissionController.donalikeAsk);


router.post("/likeComment/:id", redirectLogin, commentController.donalike);

router.post('/unlike/:id', redirectLogin, submissionController.treulike);
router.post('/unlikeNew/:id', redirectLogin, submissionController.treulikeNew);
router.post('/unlikeSub/:id', redirectLogin, submissionController.treulikeSub);
router.post('/unlikeAsk/:id', redirectLogin, submissionController.treulikeAsk);


router.post("/unlikeComment/:id", redirectLogin, commentController.treulike);


router.get("/comments", commentController.mostrarNewestComment);

router.post("/submission/:id", redirectLogin, commentController.createComment);

router.get("/comment/:id", commentController.mostrarReplyForm);

router.post("/comment/:id", redirectLogin, commentController.createReply);

router.get("/threads/:id", auth, submissionController.mostrarThreads);

module.exports = router;
