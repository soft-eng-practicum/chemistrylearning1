var leaderboardState = function(game){
    
};

var gameCreditsBackground;
var gameCreditsText;
var leaderBoardOutline;
var leaderboardLabel;
var settings;
var musicButton;
var creditsButton;
var backButton;

leaderboardState.prototype = {
  
  	create: function(){
        
        //Creates the Settings Background
		gameCreditsBackground = this.game.add.sprite(0,0,"titleBackground");
		gameCreditsBackground.scale.setTo(1, 1.35);
        
        //Creates the Settings Label
        leaderboardLabel = this.game.add.text(this.game.world.centerX-250, 300, "Leaderboard", {font: "80px Courier", fill: "#ffffff"});
        
        
        //Creates the Back button
        backButton = this.game.add.button(this.game.world.centerX-250,this.game.world.centerY+240,"backButton",this.returnHome,this);
        backButton.scale.setTo(1, 1);              
	},

    
    
    /*Function: returnHome()
    *
    *Starts the Game Title screen
    */
    returnHome: function(){
        
        this.game.state.start("GameTitle"); 
    },
    
    
    /*Function: credits()
    *
    *
    */
    credits: function(){
        
           
        
    }
};