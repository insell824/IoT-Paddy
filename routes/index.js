var express = require('express');
var router = express.Router();
var appenv = require('./lib/common/app-env');
const bodyParser = require('body-parser')
express().use(bodyParser.urlencoded({ extended: true }))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express', hostUrl:(req.headers['x-forwarded-proto'] + '://' + req.headers.host) });
});

router.get('/console', function(req, res, next) {

  (req.headers.host)

  res.render('root/console', { title: 'Express', contents:req.headers.host });
});

router.get('/client', function(req,res, nexr){
  var io = require('socket.io-client');
  var socket = io(req.headers['x-forwarded-proto'] + '://' + req.headers.host);
  socket.on('connect', function () {
    socket.emit("sendMessageToServer", {value:'send message.'});
  });
  res.render('root/sample');
});

router.post('/client', function(req,res, next){
  var io = require('socket.io-client');
  var socket = io(req.headers['x-forwarded-proto'] + '://' + req.headers.host);
  socket.on('connect', function () {
    socket.emit("sendMessageToServer", {value:JSON.stringify(req.body)});
  });
  //console.log("HERE:");
  //console.log(JSON.stringify(req.body));
  res.send('OK');
});

module.exports = router;
