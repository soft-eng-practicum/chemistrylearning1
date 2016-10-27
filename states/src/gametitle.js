var gameTitleState = function(game){
    
};

var gameTitleBackground;
var titleLabel;
var playButton;
var settingsButton;
var music;

gameTitleState.prototype = {
    
  	create: function(){
        
        //ADD WHATEVER NEEDS TO BE ADDED TO THE GAME TITLE HERE
        //BACKGROUND needs to come first!
        
        //Background
		gameTitleBackground = this.game.add.sprite(0,0,"titleBackground");
        gameTitleBackground.scale.setTo(.22, 0.65);
        
        //Game Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 150, "GAME TITLE", {font: "55px Courier", fill: "#ffffff"});
        
        //Play Button
		playButton = this.game.add.button(75,300,"play",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1.4, 1.4);
        
        //Settings Button
        settingsButton = this.game.add.button(65,450,"settings",this.gameSetting,this);
		//settingsButton.anchor.setTo(0.5,0.5);
        settingsButton.scale.setTo(1.4, 1.4); 
        
        //Game Sound
        music = this.game.add.audio("sound");
        //music.play();
                
	},
    
	playTheGame: function(){
        //Levels are randomly generated 
        var random = Math.floor(Math.random() * 2);

        //Start Level 1
        this.game.state.start("Level4");
	},
    
    gameSetting: function(){
		this.game.state.start("Settings");
	},
    
};