
var AWS = require('aws-sdk')
AWS.config.loadFromPath('./aws.json');

var configs;
//configs = require("./aws.json");
//var fs = require('fs');
// fs.access('./aws.json', function (err) {
  
//   if(err===null){
//     console.log("W");
//     configs = require("./aws.json");
//   }else{
//     configs = {
//       "accessKeyId":process.env.accessKeyId,
//       "secretAccessKey":process.env.secretAccessKey
//     }
//   }
// });
AWS.config.update({region: 'us-west-2'});

// Create publish parameters
var params = {
  //TopicArn: 'arn:aws:sns:us-west-2:596041488651:sigfox-test',
  PhoneNumber: '+81-90-5308-4505',
  //"subject": "水田状況のお知らせ",
  Message: "田んぼの様子が変わりました．\n専用端末かWebから確認できます．\nhttp://iot-paddy.herokuapp.com"
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

  

