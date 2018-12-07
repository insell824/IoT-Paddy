var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws.json');
AWS.config.update({region: 'us-east-1'});

const sendMessage = function (msg=null){
  var params = {
    PhoneNumber: '+81-80-1981-9098',
    Message: "2田んぼの様子が変わりました．\n専用端末かWebから確認できます．\nhttp://iot-paddy.herokuapp.com"
  };
  if(msg != null){
    params.Message = msg;
  }
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  publishTextPromise.then(function(data) {
    console.log("Message "+params.Message);
    console.log("MessageID is "+data.MessageId);
  }).catch(function(err) {
    console.error(err, err.stack);
  });
}

module.exports = {
  sendMessage 
}