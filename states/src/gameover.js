
var gameOverState = function(game){
    
};

var gameOverBackground;
var titleLabel;
var scoreLabel;
var playButton;
var settingsButton;
var leaderBoardButton;
var music;

gameOverState.prototype = {
    
  	create: function(){
        
        //Creates the Game Over Background
		gameOverBackground = this.game.add.sprite(0,0,"titleBackground");
        gameOverBackground.scale.setTo(.52, 0.74);
        
        //Creates the Game Over Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 150, "GAME OVER", {font: "55px Courier", fill: "#ffffff"});
        
        //Creates the High Score label
        scoreLabel = this.game.add.text(this.game.world.centerX-200, 280, "HIGH SCORE: " + score, {font: "55px Courier", fill: "#ffffff"});
        
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
        
        //Start Level 1
        this.game.state.start("GameTitle");
	}    
};