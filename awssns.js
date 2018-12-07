var AWS = require('aws-sdk');
const fs = require('fs');
const region_ = "us-east-1";
try {
  fs.statSync('./aws.json');
  AWS.config.loadFromPath('./aws.json');
  AWS.config.update({region: region_});
} catch (error) {
  if (error.code === 'ENOENT') {
    AWS.config.update({region: region_ ,accessKeyId:process.env.accessKeyId,secretAccessKey:process.env.secretAccessKey});
  } else {
    console.log(error);
  }
}





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