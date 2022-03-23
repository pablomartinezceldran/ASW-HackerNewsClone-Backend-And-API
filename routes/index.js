var express = require('express');
var router = express.Router();


const submissionController = require('../controller/submissionController')

router.get('/', submissionController.mostrarIndex);

router.get('/newest', submissionController.mostrarNewest);

router.get('/submit', submissionController.mostrarSubmissionForm);

router.post('/submission', submissionController.createSubmisson);

router.get('/:id', submissionController.mostrarSubmission);





module.exports = router;
