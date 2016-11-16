var settingsState = function(game){
    
};

var gameSettingBackground;
var settings;
var musicButton;
var creditsButton;
var backButton;

settingsState.prototype = {
  
  	create: function(){
        
        //Creates the Settings Background
		gameSettingBackground = this.game.add.sprite(0,0,"titleBackground");
		gameSettingBackground.scale.setTo(1.3, 1.1);
        
        //Creates the Settings Label
        settings = this.game.add.text(this.game.world.centerX-200, 100, "Settings", {font: "90px Courier", fill: "#ffffff"});
        
        //Creates the Sound Button 
		musicButton = this.game.add.button(this.game.world.centerX-140,this.game.world.centerY,"musicToggle",this.toggleSound,this);
        musicButton.scale.setTo(1.4, 1.4);
        
        //Creates the Credits button 
        creditsButton = this.game.add.button(this.game.world.centerX-90,this.game.world.centerY+120,"creditsButton",this.credits,this);
        creditsButton.scale.setTo(1.4, 1.4);
        
        //Creates the Back button
        backButton = this.game.add.button(this.game.world.centerX-70,this.game.world.centerY+240,"backButton",this.returnHome,this);
        backButton.scale.setTo(1.4, 1.4);              
	},
    
    
    /*Function: toggleSound()
    *
    *Toggles the sound On & Off
    */
    toggleSound: function(){
       if (!this.game.sound.mute) {
            this.game.sound.mute = true;
            this.musicButton.tint = 16711680;
        } 
        else {
            this.game.sound.mute = false;
            this.musicButton.tint = 16777215;
        }  
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