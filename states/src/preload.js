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
        
        this.game.load.text("chemicalFormula", "assets/ChemistryGame.json");
        
        this.game.load.text("chemicalFormula2", "assets/ChemistryGame2.json");
        
        //Loading Label
        loadingText = this.game.add.text(this.game.world.centerX-250, 350, "Loading... 0%", { font: "60px Courier", fill: "#ffffff"});

        progressDisplay = 0;
        
        timerEvt = this.game.time.events.loop(100, function (){

            if(progressDisplay < 100){

                if(progressDisplay < this.game.load.progress){
                    loadingText.text = 'loading... '+(++progressDisplay)+'%';
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
        
        
        
        //GAME TITLE SCREEN IMAGES & SOUNDS
        //this.game.load.image("titleBackground","assets/gameTitleBackground.jpg");
        this.game.load.image("titleBackground","assets/titleBackground.png");
        
        this.game.load.image("play","assets/button.png");
        
        this.game.load.image("logo","assets/gameTitleLogo.png");
        
        this.game.load.image("settings","assets/settingsButton.png");
        
        //Load Audio
        this.game.load.audio("sound", "assets/Autumn Nights.mp3");
        
        
        
        //SETTINGS IMAGES & SOUNDS
        
        this.game.load.image("musicToggle","assets/musicButton.png");
        
        this.game.load.image("backButton","assets/backButton.png");
        
        this.game.load.image("leaderboardButton","assets/leaderboardButton.png");
        
        this.game.load.image("creditsButton","assets/creditsButton.png");
        
           
        //LEVEL 1 IMAGES & SOUNDS
		//this.game.load.image("background","assets/Space.jpg");
        
        this.game.load.image("heart","assets/heart.png");
        //this.game.load.image("level1Background","assets/Level1Background.jpg");
        
        this.game.load.image("level1Background","assets/Space_Level1.png");
        
        this.game.load.image("spaceCraft", "assets/rocket.png");
        
        this.game.load.image("bullet", "assets/Bullets.png");
        
        this.game.load.image("asteroid", "assets/Asteroids.png");
        
        this.game.load.image("checkMark", "assets/checkMark.png");
        
        this.game.load.image("xMark", "assets/xMark.png");
        
        //Load Audio
        this.game.load.audio("correctSound", "assets/correctSound.wav");
        
        this.game.load.audio("wrongSound", "assets/wrongSound.wav");
        
        this.game.load.audio("bulletSound", "assets/bulletSound.wav");
        
        this.game.load.audio("shortBeep", "assets/shortBeep.wav");
        
        this.game.load.audio("longBeep", "assets/longBeep.wav");
        
        this.game.load.audio("levelMusic", "assets/levelMusic.mp3");
        

    
        
        //LEVEL 2 IMAGES & SOUNDS
        
        this.game.load.image('level_2_background_image', "assets/level_2_background.jpg");
        this.game.load.image('bubble_image', "assets/bubble256.png");
        
        //Load JSON file as a text file
        this.game.load.text('level_2_JSON', "assets/game_data/level_2_data.json");
        
        // Load spike image
        this.game.load.image('spike_image', "assets/spikes.png");
        
        // Load bubble image for  emitter
        this.game.load.image('emitter_bubble_image', "assets/bubble.png");
        
        
        //LEVEL 3 IMAGES & SOUNDS
        
        
        
        
        
        
        //LEVEL 4 IMAGES & SOUNDS
        
        
        
        
        
        
        
        
        //LEVEL 5 IMAGES & SOUNDS
        this.game.load.image("level5Background","assets/Lab_Background.jpg");
        
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