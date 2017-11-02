var signUpState = function(game){
    
};

var signupBackground;
var text;
var tween = null;
var sprite;
var createBUtton
var cancelButton;
var startButton;
var music;

gameIntroState.prototype = {

    //Create Function
  	create: function(){
  
    //Creates Background
    signupBackground = this.game.add.sprite(0,0,"gameTitleBackground");
    signupBackground.scale.setTo(.83,1.12);
    
    leaderboard_title = this.game.add.sprite(this.game.world.centerX - 250, 20, "Create_User_Title");
    signup_title.scale.setTo(1, 1);
    
    //Create the Create button
    createButton = this.game.add.button(this.game.world.centerX-100, this.game.world.centerY - 50,"Create Player",this.playTheGame,this);
    playButton.scale.setTo(1, 1);
    
    //Create the Cancel button
     backButton = this.game.add.button(this.game.world.centerX-250, this.game.world.centerY+240, "Cancel Button", this.returnHome,this);
    backButton.scale.setTo(1, 1);
    
    
  //Function: CreatePayer() to create a new player profile
//  createPlayer: function()
  //{
  //Create new player in the database.
  //this.game.state.start("GameTitle");
  //}
  
  //Function: Cancel()
  returntoMain: function()
  {
  this.game.state.start("GameTitle");
  }    
    
};





