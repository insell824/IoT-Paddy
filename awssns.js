// // Load the AWS SDK for Node.js

var AWS = require('aws-sdk')
//AWS.config.loadFromPath('./aws.json');

var configs;
var fs = require('fs');
fs.access('./aws.json', function (err) {
  if(null){
    consfigs = require("./aws.json");
  }else{
    consfigs = {
      "accessKeyId":process.env.accessKeyId,
      "secretAccessKey":process.env.secretAccessKey
    }
  }
});


AWS.config.update({region: 'us-west-2',"accessKeyId":configs.accessKeyId,"secretAccessKey":configs.secretAccessKey});



// Create publish parameters
var params = {
  //TopicArn: 'arn:aws:sns:us-west-2:596041488651:sigfox-test',
  PhoneNumber: '+81-80-1981-9098',
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

  



  function send_sns_handler (event, context)
  {
      console.error ("*** end_sns_handler *** start ***")
      
      var sns = new aws.SNS({
          apiVersion: '2010-03-31',
          region: 'us-west-2',
      })
  
  
      sns.publish({
          Message: event.body,
          Subject: event.subject,
          TopicArn: event.topic
          }, function(err, data){
          if ( err )
              {
              console.error ("*** end_sns_handler *** error ***")
              //context.fail('fail')
              console.log(err);
              }
      })  
  }
  
  // // ---------------------------------------------------------------
  // console.error ("*** 開始 ***")
  
  // const event = {
  //     "topic": 'arn:aws:sns:us-west-2:596041488651:sigfox-test',
  //     "subject": "This is the subject of the message. Dec/08/2017",
  //     "body": "This is the body of the message. Dec/08/2017 PM 13:29"
  // }
  
  // var context=""
  
  // send_sns_handler(event,context)
  
  // console.error ("*** 終了 ***")
  // // ---------------------------------------------------------------