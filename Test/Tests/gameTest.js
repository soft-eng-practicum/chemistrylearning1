
/*
module.exports = 
{
'Demo Test Xenon' : function (browser) {
    var width = 600;
    var height = 800;
    
  var game = new Phaser.Game(width, height, Phaser.CANVAS, "gameDiv");
   var self = this;
  this.execute(
    function(data) { // execute application specific code
      App.resizePicture(data);
      return true;
    },


    function(result) {
      if (typeof callback === "function") {
        callback.call(self, result);
      }
    }
  );

  return this;
}
};



*/

const assert = require('assert');

module.exports = 
{
'Demo Test Xenon' : function (browser) {
    var mygame;
   // wait for website to appear
   browser
    .url('http://127.0.0.1:8080')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('canvas', 10000)
    .pause(5000)
    // remote execute Javascript
   .execute(function(data) {
    console.log("state: " );
       // resize operation
     return game.state.checkState("Boot");
   }, [], function(result) {
       console.log("hello: ", result);
       //console.log(result);
       //assert(true);
       mygame = result;
   }).perform(function() {
       
   })
   .end();
    

 }
};
