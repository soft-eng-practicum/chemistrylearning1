var preloadState = function(game){
    
};

var loadingLabel;

preloadState.prototype = {
    
	preload: function(){ 
        //Load JSON
        this.game.load.text("chemicalFormula", "assets/ChemistryGame.json");
        
        //Load Images
		this.game.load.image("background","assets/Space.jpg");
        this.game.load.image("background_star", 'assets/background_star.jpg');
         this.game.load.image("black_hole_blue", "assets/black_hole_blue.jpg");
        this.game.load.image("titleBackground","assets/gameTitleBackground.jpg");
        
        this.game.load.image("level1Background","assets/Level1Background.jpg");
        
		this.game.load.image("play","assets/button.png");
        
		this.game.load.image("settings","assets/settingsButton.png");        		 

        this.game.load.image("spaceCraft", "assets/Spacecraft.png");  
        
        this.game.load.image("bullet", "assets/Bullets.png");
        
        this.game.load.image("asteroid", "assets/Asteroid.png"); 
        
        this.game.load.image('space_background', "assets/space_background.jpg");
        
        this.game.load.image('balloon_image', "assets/bubble256.png");
        
        
        //Load Text
        loadingLabel = this.game.add.text(75, 300, "loading...", {font: "40px Courier", fill: "#ffffff"}); 
        
        
        //Load Audio
        this.game.load.audio("sound", "assets/Instrumental.mp3");
	},
    
  	create: function(){
        //Starts Game Intro
		this.game.state.start("GameIntro");
        
	}
};