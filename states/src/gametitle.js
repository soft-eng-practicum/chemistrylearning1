/*var gameTitleState = function(game){
    
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
        gameTitleBackground.scale.setTo(1,1);
       // gameTitleBackground.scale.setTo(.2, .48);
        
        //Game Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 1050, "GAME TITLE", {font: "55px Courier", fill: "#ffffff"});
        
        //Play Button
		playButton = this.game.add.button(this.game.world.centerX-90,this.game.world.centerY-10,"play",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1, 1);
        
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
        this.game.state.start("Level5");
	},
    
    gameSetting: function(){
		this.game.state.start("Settings");
	},
    
};*/










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
        gameTitleBackground.scale.setTo(.52, 0.74);
        
        //Game Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 150, "XENON", {font: "100px Courier", fill: "#ffffff"});
        
        //Play Button
		playButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY,"play",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1.4, 1.4);
        
        //Settings Button
        settingsButton = this.game.add.button(this.game.world.centerX-110,this.game.world.centerY+120,"settings",this.gameSetting,this);
		//settingsButton.anchor.setTo(0.5,0.5);
        settingsButton.scale.setTo(1.4, 1.4);
        
        //Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-130,620,"leaderboardButton",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        leaderBoardButton.scale.setTo(1.4, 1.4);
        
        //Game Sound
        
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .5;
            music.play();
        }
        else{
            
        }
                
	},
    
	playTheGame: function(){
        //Levels are randomly generated 
        var random = Math.floor(Math.random() * 2);

        //Start Level 1
        this.game.state.start("Level1");
	},
    
    gameSetting: function(){
		this.game.state.start("Settings");
	},
    
};