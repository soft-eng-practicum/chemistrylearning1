
var winState = function(game){
    
};

var gameOverBackground;
var thanks_Label;
var win_Label;
var scoreLabel;
var homeButton;
var settingsButton;
var leaderBoardButton;
var music;

winState.prototype = {
    
  	create: function(){
        
        //Creates the WIN SCREEN Background
		gameOverBackground = this.game.add.sprite(0,0,"transitionBackground");
        gameOverBackground.scale.setTo(.84,1.2);
        
        //Creates the WIN SCREEN Title
        thanks_Label = this.game.add.sprite(this.game.world.centerX-270, 50, "Thanks_Logo");
        thanks_Label.scale.setTo(1, 1);
        
        //Creates the Game Over Title
        win_Label = this.game.add.sprite(this.game.world.centerX-200, 180, "Win_Logo");
        win_Label.scale.setTo(1, 1);
        
        //Checks score before High Score is displayed
        if(score < 0){
            score = 0;
        }
        
        //Creates the High Score label
        scoreLabel = this.game.add.text(this.game.world.centerX-250, 400, "HIGH SCORE: " + score, {font: "55px Courier", fill: "#ffffff"});
        
        //Creates the Home Button
		homeButton = this.game.add.button(this.game.world.centerX-100,500,"Gameover_Home",this.playTheGame,this);
        homeButton.scale.setTo(1, 1);
        
        //Creates the Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-140,620,"leaderboardButton",this.leaderboard,this);
        leaderBoardButton.scale.setTo(1, 1);
        
        //Starts music
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .5;
            music.play();
        }
        else{    
        }  
        
        started = false;
        startedLevel5 = false;
        level_2_Transition = false;
        level_4_Transition = false;
        level_5_Transition = false;
	},
    
    /*Function: playTheGame()
    *
    *Starts the Game Title Screen
    */
	playTheGame: function(){
        
        //Start Level 1
        this.game.state.start("GameTitle");
	},
    
    /*Function: leaderboard()
    *
    *Starts the Leaderboard
    */
	leaderboard: function(){
        
        //Start Leaderboard
        this.game.state.start("Leaderboard");
	}
};