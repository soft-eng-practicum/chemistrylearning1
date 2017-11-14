var gameTitleState = function(game){
    
};

var gameTitleBackground;
var titleLabel;
var playButton;
var settingsButton;
var signupButton; 
var music;

gameTitleState.prototype = {
    
    //Main Phaser Create Function
  	create: function(){
        
        //Creates the Background
		gameTitleBackground = this.game.add.sprite(0,0,"titleBackground");
        gameTitleBackground.scale.setTo(1, 1.35);
        
        //Creates the Play Button
		playButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY - 60,"play",this.playTheGame,this);
        playButton.scale.setTo(1, 1);
        
        //Creates the Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-140, this.game.world.centerY + 50,"leaderboardButton", this.leaderBoard, this);
        leaderBoardButton.scale.setTo(1, 1);
        
        //Creates the Settings Button
        settingsButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+150,"settings",this.gameSetting,this);
        settingsButton.scale.setTo(1, 1);
        
        
        //Creates the Play Button
		creditsButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+250,"credits",this.credits,this);
        creditsButton.scale.setTo(1, 1);
        
        //Creates the Signup Button
        signupButton = this.game.add.button(this.game.world.centerX-130,this.game.world.centerY - 160,"signup",this.signup,this);
        signupButton.scale.setTo(.75, .5);

        
        //Starts the Game Sound 
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .2;
            music.play();
            winMusic.pause();
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
        this.game.state.start("LevelSelect");
	},
    
    /*Function: leaderBoard()
    *
    *Starts LeaderBoard
    */
	leaderBoard: function(){
        //Starts LeaderBoard
        this.game.state.start("Leaderboard");
	},
    
    
    /*Function: gameSetting()
    *
    *Starts the Settings Menu
    */
    gameSetting: function(){
        //Starts Settings
		this.game.state.start("Settings");
    },
    
    /*Function: credits()
    *
    *Starts Credits
    */
	credits: function(){
        //Starts Credits
        this.game.state.start("Credits");
	},
    
     /*Function: createUser()
    *
    *Starts Signup
    */
	signup: function(){
        //Starts signup
        this.game.state.start("Signup");
	}       
};