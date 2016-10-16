var settingsState = function(game){
    
};

var gameSettingBackground;
var settings;
var playButton;
var settingsButton;

settingsState.prototype = {
  
  	create: function(){
        //Settings Background
		gameSettingBackground = this.game.add.sprite(0,0,"");
		gameTitleBackground.anchor.setTo(0.4,0.4);
        
        //Settings Label
        settings = this.game.add.text(110, 100, "Settings", {font: "90px Courier", fill: "#ffffff"});
        
		playButton = this.game.add.button(320,400,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1.8, 1.8);
        
        settingsButton = this.game.add.button(320,550,"settings",this.gameSetting,this);
		settingsButton.anchor.setTo(0.5,0.5);
        settingsButton.scale.setTo(1.8, 1.8);
                   
	}
        
};