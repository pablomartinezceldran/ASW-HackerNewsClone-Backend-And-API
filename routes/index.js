var express = require('express');
var router = express.Router();


const alumnoController = require('../controller/submissionController')

router.get('/', alumnoController.mostrarIndex);
router.get('/newest', alumnoController.mostrarNewest);
router.get('/submit', alumnoController.mostrarSubmissionForm);
router.get('/:id', alumnoController.mostrarSubmission);





module.exports = router;
