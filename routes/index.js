var express = require('express');
var router = express.Router();
var data = require('../data/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/test', function (req, res, next) {
    res.send({ message: 'Hello handsome' });
});

module.exports = router;
