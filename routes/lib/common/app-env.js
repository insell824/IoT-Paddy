'use strict';

var appenv = {};

var req;
appenv.setReq = function (req){
  this.req = req;
}

appenv.isProductionEnv = function (req) {
  if(req == undefined){
    if(this.req == undefined){
      return false;
    }
  }else{
    this.req = req;
  }

  
};

module.exports = appenv;