var gameTitleState = function(game){
    
};

var gameTitleBackground;
var titleLabel;
var playButton;
var settingsButton;
var music;

gameTitleState.prototype = {
    
    //Main Phaser Create Function
  	create: function(){
        
        //Creates the Background
		gameTitleBackground = this.game.add.sprite(0,0,"titleBackground");
        gameTitleBackground.scale.setTo(.52, 0.74);
        
        //Creates the Game Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 150, "XENON", {font: "100px Courier", fill: "#ffffff"});
        
        //Creates the Play Button
		playButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY,"play",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1.4, 1.4);
        
        //Creates the Settings Button
        settingsButton = this.game.add.button(this.game.world.centerX-110,this.game.world.centerY+120,"settings",this.gameSetting,this);
        settingsButton.scale.setTo(1.4, 1.4);
        
        //Creates the Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-130,620,"leaderboardButton",this.playTheGame,this);
        leaderBoardButton.scale.setTo(1.4, 1.4);
        
        //Starts the Game Sound 
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .5;
            music.play();
        }
        else{
            
        }             
	},
    
    
    /*Function: playTheGame()
    *
    *Starts Level 1
    */
	playTheGame: function(){
        //Starts Level 1
        this.game.state.start("Level1");
	},
    
    
    /*Function: gameSetting()
    *
    *Starts the Settings Menu
    */
    gameSetting: function(){
        //Starts Settings
		this.game.state.start("Settings");
    }
    
};