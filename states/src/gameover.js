
var gameOverState = function(game){
    
};

var gameOverBackground;
var titleLabel;
var scoreLabel;
var homeButton;
var settingsButton;
var leaderBoardButton;
var music;

gameOverState.prototype = {
    
  	create: function(){
        
        //Creates the Game Over Background
		gameOverBackground = this.game.add.sprite(0,0,"settingsBackground");
        gameOverBackground.scale.setTo(.83, 1.1);
        
        //Creates the Game Over Title
        titleLabel = this.game.add.sprite(this.game.world.centerX-180, 50, "Gameover_Label");
        titleLabel.scale.setTo(1, 1);
        
        //Checks score before High Score is displayed
        if(score < 0){
            score = 0;
        }
        
        //Creates the High Score label
        scoreLabel = this.game.add.text(this.game.world.centerX-230, 300, "HIGH SCORE: " + score, {font: "55px Courier", fill: "#ffffff"});
        
        //Creates the Home Button
		homeButton = this.game.add.button(this.game.world.centerX-100,500,"Gameover_Home",this.playTheGame,this);
        homeButton.scale.setTo(1, 1);
        
        //Creates the Leaderboard Button

		leaderBoardButton = this.game.add.button(this.game.world.centerX-140,650,"leaderboardButton",this.leaderboard,this);
        
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