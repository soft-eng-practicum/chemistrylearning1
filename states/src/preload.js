var preloadState = function(game){
    
};

var loadingLabel;
var progressDisplay;
var loadingText;
var timerEvt;
var backgroundColor;

preloadState.prototype = {
    
    //Main Phaser Preload Function
	preload: function(){ 

        //Load JSON
        
      //  this.game.load.text("chemicalFormul   a", "assets/ChemistryGame.json");
        
      //  this.game.load.text("chemicalFormula2", "assets/ChemistryGame2.json");
     
        //FONTS
        this.game.load.script("gameFont1", "assets/GOOGLE_FONTS/Bangers/Bangers.ttf");

        
        //Loading Label
        loadingText = this.game.add.text(this.game.world.centerX-250, 350, "Loading... 0%", { font: "60px Courier", fill: "#ffffff"});

        progressDisplay = 0;
        
        timerEvt = this.game.time.events.loop(100, function (){

            if(progressDisplay < 100){

                if(progressDisplay < this.game.load.progress){
                    loadingText.text = 'Loading... '+(++progressDisplay)+'%';
                }
            }
            else{

                loadingText.text = 'Ready, Go!';
                this.game.time.events.remove(timerEvt);
            }
        }, this);
          
        
        //INTRO IMAGES & SOUNDS        
        this.game.load.image('space_background', "assets/space_background.jpg");
        
        this.game.load.image('Astronaut', "assets/Astronaut.png");
        
        this.game.load.image('XE1', "assets/XE1.png");
        
        
        
        //GAME TITLE SCREEN IMAGES & SOUNDS
        //this.game.load.image("titleBackground","assets/gameTitleBackground.jpg");
        this.game.load.image("titleBackground","assets/titleBackground.png");
        
        this.game.load.image("play","assets/Home_Screen_Play.png");
        
        this.game.load.image("logo","assets/gameTitleLogo.png");
        
        this.game.load.image("settings","assets/Home_Screen_Settings.png");
        
        this.game.load.image("credits","assets/Home_Screen_Credits.png");
        
        
        //Load Audio
        this.game.load.audio("sound", "assets/Autumn Nights.mp3");
        
        
        //WINNER SCREEN IMAGES
        this.game.load.image("Thanks_Logo","assets/Thanks_Logo.png");
        
        this.game.load.image("Win_Logo","assets/Win_Logo.png");
        
        
        
        //GAMEOVER IMAGES
        this.game.load.image("Gameover_Home","assets/Gameover_Home.png");   
        this.game.load.image("Gameover_Label","assets/Game_Over_Pink.png");
        
        
        //LEADERBOARD IMAGES & JSON
        this.game.load.image('leaderboard_background_image', "assets/space_background.jpg");
        
        this.game.load.text('leaderboard_JSON', "assets/game_data/leaderboard.json");
        
        this.game.load.image('home_button_image',"assets/home_button.png");
        
        this.game.load.image('High_Scores_Label',"assets/High_Scores_Label.png");
        
        
        
        //SETTINGS IMAGES & SOUNDS
        this.game.load.image("settingsBackground","assets/settingsBackground.png");
        
        this.game.load.image("musicOn","assets/Sound_On_Button.png");
        
        this.game.load.image("musicOff","assets/Sound_Off_Button.png");
        
        this.game.load.image("backButton","assets/Back_Button.png");
        
        this.game.load.image("leaderboardButton","assets/Home_Screen_Leaderboard.png");
        
        this.game.load.image("creditsButton","assets/creditsButton.png");
        
        this.game.load.image("Settings_Label","assets/Settings_Label.png");
        
        
        
        //CREDITS SCREEN IMAGES
        this.game.load.image("creditsText","assets/Credits_Text.png");
        
        
        
        //TRANSITION SCREEN IMAGES
        this.game.load.image("transitionBackground","assets/transitionBackground.png");
           
        
        
        //LEVEL 1 IMAGES, SOUNDS, & JSON
        
        this.game.load.text('level_1_JSON', "assets/game_data/level_1_data.json");
        
        this.game.load.text('level_1_JSON_series_2', "assets/game_data/level_1_data_series_2.json");
        
        this.game.load.text('level_1_JSON_series_3', "assets/game_data/level_1_data_series_3.json");
        
        this.game.load.image("heart","assets/heart.png");
        
        this.game.load.image("level1Background","assets/Space_Level1.png");
        
        this.game.load.image("menu","assets/Resume_Quit_Button.png");
        
        this.game.load.image("spaceCraft", "assets/rocket.png");
        
        this.game.load.image("bullet", "assets/Bullets.png");
        
        this.game.load.image("asteroid", "assets/Asteroids.png");
        
        this.game.load.image("checkMark", "assets/checkMark.png");
        
        this.game.load.image("xMark", "assets/xMark.png");
        
        this.game.load.image("Pause_Button","assets/Pause_Button.png");
        
        //Load Audio
        this.game.load.audio("correctSound", "assets/correctSound.wav");
        
        this.game.load.audio("wrongSound", "assets/wrongSound.wav");
        
        this.game.load.audio("bulletSound", "assets/bulletSound.wav");
        
        this.game.load.audio("shortBeep", "assets/shortBeep.wav");
        
        this.game.load.audio("longBeep", "assets/longBeep.wav");
        
        this.game.load.audio("levelMusic", "assets/levelMusic.mp3");
        

    
        
        //LEVEL 2 IMAGES, SOUNDS, & JSON
        
        this.game.load.image('level_2_background_image', "assets/bubble background.png");
        
        this.game.load.image('bubble_image', "assets/bubble256.png");
        
        //Load JSON file as a text file
        this.game.load.text('level_2_JSON', "assets/game_data/level_2_data.json");
        
        this.game.load.text('level_2_JSON_series_2', "assets/game_data/level_2_data_series_2.json");
        
        // Load spike image
        this.game.load.image('spike_image', "assets/spikes.png");
        
        // Load bubble image for  emitter
        this.game.load.image('emitter_bubble_image', "assets/bubble.png");
        
        
        //LEVEL 3 IMAGES & SOUNDS
	    this.game.load.text('level_3_JSON', "assets/game_data/level_3_data.json");
        
        
        //LEVEL 4 IMAGES & SOUNDS
        
        
        
        //LEVEL 5 IMAGES, SOUNDS, & JSON
        this.game.load.image("level5Background","assets/Lab_Background.jpg");
        
        this.game.load.text('level_5_JSON', "assets/game_data/level_5_data.json");
        
        this.game.load.text('level_5_JSON_series_2', "assets/game_data/level_5_data_series_2.json");
        
        this.game.load.image("blueFlask", "assets/blue_flask.png");
        
        this.game.load.image("greenFlask", "assets/green_flask.png"); 
        
        this.game.load.image("redFlask", "assets/red_flask.png"); 
        
        this.game.load.image("purpleFlask", "assets/purple_flask.png"); 
        
        this.game.load.image("orangeFlask", "assets/orangeFlask.png"); 

        this.game.load.spritesheet("guy", "assets/man_walking.png", 124, 254);
        
        
	},
    
    //Main Phaser Create Function
  	create: function(){
        //Starts Game Intro
		this.game.state.start("GameIntro");
    }
    
};