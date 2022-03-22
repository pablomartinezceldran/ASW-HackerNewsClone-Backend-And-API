var express = require('express');
var router = express.Router();

router.get('/', (request, response) => {
  return response.send('OK');
});

router.get('/index', (request, response) => {
  response.render('index', {
    subject: 'EJS template engine',
    name: 'our template',
    link: 'https://google.com'
  });
});

module.exports = router;
