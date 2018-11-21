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

router.get('/client', function(req,res, nexr){
  var io = require('socket.io-client');
  var socket = io(req.protocol + '://' + req.headers.host);
  socket.on('connect', function () {
    socket.emit("sendMessageToServer", {value:'send message.'});
  });
  res.render('root/sample');
});

router.post('/client', function(req,res, nexr){
  console.log(req);
  res.send('OK');
});

module.exports = router;
