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
   
gameIntroState.prototype = {
    
  	create: function(){
  
    gameTitleBackground = this.game.add.tileSprite(0, 0, 1750,1200, "space_background");
    gameTitleBackground.scale.setTo(0.575,0.67);
        
    background_velocity = 2;

    titleLabel = this.game.add.text(this.game.world.centerX-150, 300, "GAME INTRO", {font: "50px Courier", fill: "#ffffff"});
    titleLabel.alpha = 0.1;

    // This tween will wait 5 seconds 
    timeTween = this.game.add.tween(titleLabel).to( { alpha: 1 }, /*5000/*/0, "Linear", true, 300);

    timeTween.onComplete.add(this.onComplete, this);    
        
    logo = this.add.sprite(0, 0, "IntroLogo");
    logo.scale.set(0.5);

    var w = game.width - logo.width;
    var h = game.height - logo.height;

    tween = game.add.tween(logo).to( { x: [ w, w, 0, 0 ], y: [ 0, h, h, 0 ] }, 4000, "Sine.easeInOut", true, -1, false);
    

    //Fading of LOGO

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'IntroLogo');

    sprite.anchor.setTo(0.5, 0.5);
    sprite.alpha = 0;

    game.add.tween(sprite).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
    music = this.game.add.audio("sound");

    },
    
    onComplete: function() {

        //Starts the Game Title
        this.game.state.start("GameTitle");
    },
    
    update: function() {
        gameTitleBackground.tilePosition.y += background_velocity;
    
    }
  
};





