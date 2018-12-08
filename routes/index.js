var express = require('express');
var router = express.Router();
var appenv = require('./lib/common/app-env');
const bodyParser = require('body-parser');
var myaws = require("../awssns.js");
express().use(bodyParser.urlencoded({ extended: true }))
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express', hostUrl:(process.env.URL || "http://localhost:3000") });
});


router.get('/demoview', function(req, res, next) {
  res.render('root/demoview', { title: 'Express', hostUrl:(process.env.URL || "http://localhost:3000") });
});
router.get('/push', function(req, res, next) {
  res.render('root/push', { title: 'Express', hostUrl:(process.env.URL || "http://localhost:3000") });
});

router.get('/console', function(req, res, next) {

  (req.headers.host)

  res.render('root/console', { title: 'Express', contents:req.headers.host });
});

router.get('/client', function(req,res, nexr){
  var io = require('socket.io-client');
  var socket = io(process.env.URL || "http://localhost:3000");
  socket.on('connect', function () {
    socket.emit("sendMessageToServer", {value:'send message.'});
  });
  res.render('root/sample');
});

// Sigfoからメッセージが届く
router.post('/client', function(req,res, next){
  var io = require('socket.io-client');
  var socket = io(process.env.URL || "http://localhost:3000");
  socket.on('connect', function () {
    socket.emit("newSigfoxObj", req.body);
  });
  res.send('OK');
});

module.exports = router;
