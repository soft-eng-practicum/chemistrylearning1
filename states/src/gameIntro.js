var gameIntroState = function(game){
    
};
  
var gameTitleBackground;
var titleLabel;
var timeTween;
var background_velocity;
var logo;
var text;
var tween;
var sprite;
var levelMusic;
   
gameIntroState.prototype = {
    
  	create: function(){
  
    //Creates background
    gameTitleBackground = this.game.add.tileSprite(0, 0, 1750,1200, "space_background");
    gameTitleBackground.scale.setTo(0.575,0.67);
    
    //Sets the speed of the GIF background
    background_velocity = 2;

    //Creates the Title Label
    titleLabel = this.game.add.text(0, 0, "", {font: "50px Courier", fill: "#ffffff"});

    //Creates a Tween for the Title Label  
    timeTween = this.game.add.tween(titleLabel).to( { alpha: 1 }, 6000/*0*/, "Linear", true, 300);

    timeTween.onComplete.add(this.onComplete, this);    
    
    //Creates a sprite in the middle of the screen 
    sprite = game.add.sprite(game.world.centerX - 300, game.world.centerY -100, 'XE1');
   // sprite.scale.set(0.7, 0.5);
    sprite.alpha = 0.2;

    //Fades in sprite
    game.add.tween(sprite).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    //Creates audio
    music = this.game.add.audio("sound");
        
    levelMusic = this.game.add.audio("levelMusic");

    },
    
    /*Function: onComplete()
    *
    *Calls when Tween has completed.
    *Starts the Game Title
    */
    onComplete: function() {

        //Starts Game Title
        this.game.state.start("GameTitle");
    },
    
    //Main Phaser Update Function
    update: function() {
        //Sets the direction of the velocity of the GIF background
        gameTitleBackground.tilePosition.y += background_velocity;
    
    }
  
};





