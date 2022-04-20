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

router.get("/ask", submissionController.mostrarAsk);


router.get("/submission/:id", submissionController.mostrarSubmissionTree);

router.post('/like/:id', redirectLogin, submissionController.donalike);
router.post('/likeNew/:id', redirectLogin, submissionController.donalikeNew);
router.post('/likeSub/:id', redirectLogin, submissionController.donalikeSub);
router.post('/likeCom/:id', redirectLogin, submissionController.donalikeCom);

router.post('/likeComment/:id', redirectLogin, commentController.donalike);

router.post('/unlike/:id', redirectLogin, submissionController.treulike);
router.post('/unlikeNew/:id', redirectLogin, submissionController.treulikeNew);
router.post('/unlikeSub/:id', redirectLogin, submissionController.treulikeSub);
router.post('/unlikeCom/:id', redirectLogin, submissionController.treulikeCom);

router.post('/unlikeComment/:id', redirectLogin, commentController.treulike);

router.get('/comments', commentController.mostrarNewestComment);

router.post('/submission/:id', redirectLogin, commentController.createComment);

router.get("/comment/:id", commentController.mostrarReplyForm);

router.post("/comment/:id", redirectLogin, commentController.createReply);





module.exports = router;
