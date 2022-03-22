var express = require('express');
var router = express.Router();


const alumnoController = require('../controller/submissionController')

router.get('/', alumnoController.mostrar);
router.get('/newest', alumnoController.mostrar);
router.get('/submit', alumnoController.mostrar);





module.exports = router;
