var express = require('express');

var router = express.Router();
var os = require('os');
var hostname = os.hostname();

/* GET home page. */
router.get('/con', function(req, res, next) {
  console.log(hostname);
  res.render('index', { title: 'Express' });
 
});


module.exports = router;
