
var gameOverState = function(game){
    
};

var gameOverBackground;
var titleLabel;
var scoreLabel;
var homeButton;
var leaderBoardButton;
var music;



gameOverState.prototype = {

    name: "",

  	create: function(){
        lives = 3;
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
        
         //Create input text boxes
        this.name = game.add.inputField(this.game.world.centerX-150, 400, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 300, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'Enter Name', type: PhaserInput.InputType.name});
        
       
                
        //Creates the Home Button   
		homeButton = this.game.add.button(this.game.world.centerX-100,500,"Gameover_Home",this.playTheGame,this);
        homeButton.scale.setTo(1, 1);
        
        //Create Submit button
        submitButton = this.game.add.button(this.game.world.centerX-100,600,"Level 3",this.submit,this);
        submitButton.scale.setTo(1, 1);
        
        //Creates the Leaderboard Button

		leaderBoardButton = this.game.add.button(this.game.world.centerX-140,650,"leaderboardButton",this.leaderboard,this);
        
        leaderBoardButton.scale.setTo(1, 1);
        
        //Starts music
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .5;
            music.play();
            levelMusic.pause();
        }
        else{    
        }
        
        started = false;
        startedLevel5 = false;
        level_2_Transition = false;
        level_4_Transition = false;
        level_5_Transition = false;
	},
    
    submit: function(){
        if(score > 0)
            console.log("field: " + this.name.value);
            $.ajax({
                url: "https://api.mlab.com/api/1/databases/xenon/collections/leaderboard?apiKey=pG3dyrtnobnPgqHa7HvuUXA1mNADzxgM",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "name": this.name.value, 
                    "high_score": score
                }),
                success: function (result) {
                    console.log(result);
                }
            });   
        
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