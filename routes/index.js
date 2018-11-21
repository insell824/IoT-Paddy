var express = require('express');
var router = express.Router();
var os = require('os');
var hostname = os.hostname();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.get('/console', function(req, res, next) {
  res.render('root/console', { title: 'Express', contents:hostname });
});

module.exports = router;
