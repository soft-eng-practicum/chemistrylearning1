var settingsState = function(game){
    
};

var gameSettingBackground;
var settings;
var musicOnButton;
var musicOffButton;
var creditsButton;
var backButton;

settingsState.prototype = {
  
  	create: function(){
        
        //Creates the Settings Background
		gameSettingBackground = this.game.add.sprite(0,0,"settingsBackground");
		gameSettingBackground.scale.setTo(.83, 1.1);
        
        //Creates the Settings Label
        settings = this.game.add.sprite(this.game.world.centerX-250, 100, "Settings_Label");
        
        //Creates the Sound Button 
		musicOnButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY - 100,"musicOn",this.toggleSoundOn,this);
        musicOnButton.scale.setTo(1, 1);
        
        //Creates the Sound Button 
		musicOffButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY + 50,"musicOff",this.toggleSoundOff,this);
        musicOffButton.scale.setTo(1, 1);
        
        //Creates the Back button
        backButton = this.game.add.button(this.game.world.centerX-250,this.game.world.centerY+240,"backButton",this.returnHome,this);
        backButton.scale.setTo(1, 1);              
	},
    
    
    /*Function: toggleSoundOn()
    *
    *Toggles the sound On
    */
    toggleSoundOn: function(){
        this.game.sound.mute = false;
   
    },
    
    /*Function: toggleSoundOff()
    *
    *Toggles the sound Off
    */
    toggleSoundOff: function(){
        this.game.sound.mute = true;
    },
    
    
    /*Function: returnHome()
    *
    *Starts the Game Title screen
    */
    returnHome: function(){
        
        this.game.state.start("GameTitle"); 
    }
};