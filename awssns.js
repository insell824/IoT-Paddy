var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws.json');
AWS.config.update({region: 'us-west-2'});
var params = {
  PhoneNumber: '+819079608067',
  Message: "2田んぼの様子が変わりました．\n専用端末かWebから確認できます．\nhttp://iot-paddy.herokuapp.com"
};
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
publishTextPromise.then(function(data) {
    console.log("Message "+params.Message+" send sent to the topic "+params.TopicArn);
    console.log("MessageID is "+data.MessageId);
  }).catch(function(err) {
    console.error(err, err.stack);
  }
);
