var settingsState = function(game){
    
};

var gameSettingBackground;
var settings;
var musicButton;
var creditsButton;
var backButton;
var off;

settingsState.prototype = {
  
  	create: function(){
        //Settings Background
		gameSettingBackground = this.game.add.sprite(0,0,"titleBackground");
		gameSettingBackground.scale.setTo(.52, 0.74);
        
        //Settings Label
        settings = this.game.add.text(this.game.world.centerX-200, 100, "Settings", {font: "90px Courier", fill: "#ffffff"});
        
		musicButton = this.game.add.button(this.game.world.centerX-140,this.game.world.centerY,"musicToggle",this.toggleSound,this);
		//playButton.anchor.setTo(0.5,0.5);
        musicButton.scale.setTo(1.4, 1.4);
        
        creditsButton = this.game.add.button(this.game.world.centerX-90,this.game.world.centerY+120,"creditsButton",this.credits,this);
		//settingsButton.anchor.setTo(0.5,0.5);
        creditsButton.scale.setTo(1.4, 1.4);
        
        backButton = this.game.add.button(this.game.world.centerX-70,this.game.world.centerY+240,"backButton",this.returnHome,this);
		//settingsButton.anchor.setTo(0.5,0.5);
        backButton.scale.setTo(1.4, 1.4);
                   
	},
    
    toggleSound: function(){
       if (!this.game.sound.mute) {
            this.game.sound.mute = true;
            this.soundButton.tint = 16711680;
        } 
        else {
            this.game.sound.mute = false;
            this.soundButton.tint = 16777215;
        }
        
    },
    
    returnHome: function(){
        
        this.game.state.start("GameTitle"); 
    },
    
    credits: function(){
        
        
        
        
    }
        
};