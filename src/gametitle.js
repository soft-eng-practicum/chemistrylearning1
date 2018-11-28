var gameTitleState = function(game){
    
};

var gameTitleBackground;

var playButton;
var settingsButton;
var signupButton; 
var statsButton;
var music;
var stats; 


gameTitleState.prototype = {
    
    //Main Phaser Create Function
  	create: function(){  
        
        
        
        //Creates the Background
		gameTitleBackground = this.game.add.sprite(0,0,"titleBackground");
        gameTitleBackground.scale.setTo(1, 1.35);
        
        //Creates the Play Button
		playButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY - 100,"play",this.playTheGame,this);
        playButton.scale.setTo(1, .9);
        
        //Creates the Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-140, this.game.world.centerY + 0,"leaderboardButton", this.leaderBoard, this);
        leaderBoardButton.scale.setTo(1, .9);
        
        //Creates the Settings Button
        settingsButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+90,"settings",this.gameSetting,this);
        settingsButton.scale.setTo(1, .9);
        
        //Creates the Play Button
		creditsButton = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+180,"credits",this.credits,this);
        creditsButton.scale.setTo(1, .9);
        
        //Creates the Signup Button
        //progressButton = this.game.add.button(this.game.world.centerX-130,this.game.world.centerY - 160,"signup",this.signup,this);
        //signupButton.scale.setTo(.75, .5);
        
        //Create a new user button
        newUserButton = this.game.add.button(this.game.world.centerX-250,this.game.world.centerY + 350,"newUser",this.signup,this);
        newUserButton.scale.setTo(.45, .5);
        
        //Login button
        loginButton = this.game.add.button(this.game.world.centerX+150,
        this.game.world.centerY + 345,"login",this.login,this);
        loginButton.scale.setTo(.45, .5);      
        
        
        statsButton = this.game.add.button(this.game.world.centerX-85,
        this.game.world.centerY + 260,"stats",this.stats,this);
        statsButton.scale.setTo(.1, .1);  
        statsButton.visible = false;
        
                 
       
       if(game.loggedIn == true)
           {
               statsButton.visible = true;
           }
        
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
	}, 
    
     /*Function: loginPage()
    *
    *Starts Login page
    */
	login: function(){ 
        //Starts login
        this.game.state.start("Login");
	},
    
    stats: function(){ 
        //Starts login
        this.game.state.start("Stats");
	},
};