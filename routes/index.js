var express = require('express');
var router = express.Router();


const submissionController = require('../controller/submissionController')
const commentController = require("../controller/commentController");

router.get('/', submissionController.mostrarIndex);

router.get('/newest', submissionController.mostrarNewest);

router.get('/submit', submissionController.mostrarSubmissionForm);

router.post('/create', submissionController.createSubmisson);

router.get('/submission/:id', submissionController.mostrarSubmission);

router.get('/comments', commentController.mostrarNewestComment);

router.post('/submission/:id', commentController.createComment);

router.get('/CSubmit', commentController.mostrarCommentForm);





module.exports = router;