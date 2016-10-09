var gameIntroState = function(game){
    
};
  
var gameTitleBackground;
var titleLabel;
var tween;
var background_velocity;
   
gameIntroState.prototype = {
    
  	create: function(){
  
        //ADD WHATEVER NEEDS TO BE ADDED TO THE GAME TITLE HERE
        //BACKGROUND needs to come first!
		gameTitleBackground = this.game.add.tileSprite(0, 0, 1750, 900, "space_background");
		gameTitleBackground.scale.setTo(0.25,0.75);
        
        background_velocity = 2;
        
        titleLabel = this.game.add.text(this.game.world.centerX-150, 300, "GAME INTRO", {font: "50px Courier", fill: "#ffffff"});
        titleLabel.alpha = 0.1;
        
        // This tween will wait 5 seconds 
        tween = this.game.add.tween(titleLabel).to( { alpha: 1 }, /*5000*/0, "Linear", true, 300);

        tween.onComplete.add(this.onComplete, this);  
	},

    onComplete: function() {

        //Starts the Game Title
        this.game.state.start("GameTitle");

    },
    
    update: function() {
        gameTitleBackground.tilePosition.y += background_velocity;
    
    }
};