var express = require('express');
var router = express.Router();
var appenv = require('./lib/common/app-env');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express', hostUrl:(req.protocol + '://' + req.headers.host) });
});

router.get('/console', function(req, res, next) {

  (req.headers.host)

  res.render('root/console', { title: 'Express', contents:req.headers.host });
});

module.exports = router;
