var preloadState = function(game){
    
};

var loadingLabel;

preloadState.prototype = {
    
	preload: function(){ 
        //Load JSON
        this.game.load.text("chemicalFormula", "assets/ChemistryGame.json");
        
        //Loading Label
        loadingLabel = this.game.add.text(this.game.world.centerX-450, 300, "Loading...", {font: "50px Courier", fill: "#ffffff"});
        
        
        
        //INTRO IMAGES & SOUNDS
        this.game.load.image("IntroLogo","assets/Asteroid.png");
        
        this.game.load.image('space_background', "assets/space_background.jpg");
        
        
        
        //GAME TITLE SCREEN IMAGES & SOUNDS
        this.game.load.image("titleBackground","assets/gameTitleBackground.jpg");
        
        this.game.load.image("play","assets/button.png");
        
        this.game.load.image("settings","assets/settingsButton.png");
        
        //Load Audio
        this.game.load.audio("sound", "assets/Autumn Nights.mp3");
        
        
        
        //SETTINGS IMAGES& SOUNDS
        this.game.load.image("musicToggle","assets/musicButton.png");
        
        this.game.load.image("backButton","assets/backButton.png");
        
        this.game.load.image("leaderboardButton","assets/leaderboardButton.png");
        
        this.game.load.image("creditsButton","assets/creditsButton.png");
        
        
        
          
        //LEVEL 1 IMAGES & SOUNDS
		//this.game.load.image("background","assets/Space.jpg");
        
        this.game.load.image("level1Background","assets/Level1Background.jpg");
        
        this.game.load.image("spaceCraft", "assets/Spacecraft.png");
        
        this.game.load.image("bullet", "assets/Bullets.png");
        
        this.game.load.image("asteroid", "assets/Asteroid.png");
        

    
        //LEVEL 2 IMAGES & SOUNDS
        this.game.load.image('balloon_image', "assets/bubble256.png");
        
        
        //LEVEL 3 IMAGES & SOUNDS
        
        
        //LEVEL 4 IMAGES & SOUNDS
        
        
        //LEVEL 5 IMAGES & SOUNDS
        this.game.load.image("level5Background","assets/Lab_Background.jpg");
        
        this.game.load.image("checkMark", "assets/checkMark.png");
        
        this.game.load.image("blueFlask", "assets/blue_flask.png");
        
        this.game.load.image("greenFlask", "assets/green_flask.png"); 
        
        this.game.load.image("redFlask", "assets/red_flask.png"); 
        
        this.game.load.image("purpleFlask", "assets/purple_flask.png"); 
        
        this.game.load.image("orangeFlask", "assets/orangeFlask.png"); 

        this.game.load.spritesheet("guy", "assets/man_walking.png", 124, 254);
        
	},
    
  	create: function(){
        //Starts Game Intro
		this.game.state.start("GameIntro");
        
	}
};