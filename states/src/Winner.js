
var winState = function(game){
    
};

var gameOverBackground;
var titleLabel;
var scoreLabel;
var playButton;
var settingsButton;
var leaderBoardButton;
var music;

winState.prototype = {
    
  	create: function(){
        
        //Creates the WIN SCREEN Background
		gameOverBackground = this.game.add.sprite(0,0,"transitionBackground");
        gameOverBackground.scale.setTo(.84,1.2);
        
        //Creates the WIN SCREEN Title
        titleLabel = this.game.add.text(this.game.world.centerX-250, 150, "CONGRATULATIONS    YOU WIN!!!", {font: "55px Courier", fill: "RED", wordWrap: true, wordWrapWidth: 500});
        
        //Creates the Game Over Title
        titleLabel = this.game.add.text(this.game.world.centerX-270, 30, "THANKS FOR PLAYING THE DEMO", {font: "33px Courier", fill: "YELLOW", wordWrap: true, wordWrapWidth: 600});
        
        //Checks score before High Score is displayed
        if(score < 0){
            score = 0;
        }
        
        //Creates the High Score label
        scoreLabel = this.game.add.text(this.game.world.centerX-250, 280, "HIGH SCORE: " + score, {font: "55px Courier", fill: "#ffffff"});
        
        //Creates the Play Button
		playButton = this.game.add.button(this.game.world.centerX-120,400,"play",this.playTheGame,this);
        playButton.scale.setTo(1.4, 1.4);
        
        //Creates the Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-150,550,"leaderboardButton",this.playTheGame,this);
        leaderBoardButton.scale.setTo(1.4, 1.4);
        
        //Starts music
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
    *Starts the Game Title Screen
    */
	playTheGame: function(){

        started = false;
        startedLevel5 = false;
        level_2_Transition = false;
        level_5_Transition = false;
        
        //Start Level 1
        this.game.state.start("GameTitle");
	}    
};