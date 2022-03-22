var express = require('express');
var router = express.Router();


const alumnoController = require('../controller/submissionController')

router.get('/', alumnoController.mostrar);



module.exports = router;
