
var gameOverState = function(game){
    
};

var gameTitleBackground;
var titleLabel;
var scoreLabel;
var playButton;
var settingsButton;
var leaderBoardButton;
var music;

gameOverState.prototype = {
    
  	create: function(){
        
        //Background
		gameTitleBackground = this.game.add.sprite(0,0,"titleBackground");
        gameTitleBackground.scale.setTo(.52, 0.74);
        
        //Game Title
        titleLabel = this.game.add.text(this.game.world.centerX-160, 150, "GAME OVER", {font: "55px Courier", fill: "#ffffff"});
        
        //High Score
        scoreLabel = this.game.add.text(this.game.world.centerX-200, 280, "HIGH SCORE: " + score, {font: "55px Courier", fill: "#ffffff"});
        
        //Play Button
		playButton = this.game.add.button(this.game.world.centerX-120,400,"play",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(1.4, 1.4);
        
        //Leaderboard Button
		leaderBoardButton = this.game.add.button(this.game.world.centerX-150,550,"leaderboardButton",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
        leaderBoardButton.scale.setTo(1.4, 1.4);
        
        
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .5;
            music.play();
        }
        else{
            
        }
        
        
        
                
	},
    
	playTheGame: function(){

        started = false;
        startedLevel5 = false;
        //Start Level 1
        this.game.state.start("GameTitle");
	},
    

    
};