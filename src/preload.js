var preloadState = function(game){
    
};

var loadingLabel;
var progressDisplay;
var loadingText;
var timerEvt;
var backgroundColor;
var loggedIn; //Game variable called throughout the game to show that the player is logged in.
var statsButton;



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
        
        this.game.load.image('XenonMorphs Logo', "assets/XenonMorphs Logo.png");
        
        
        
        //GAME TITLE SCREEN IMAGES & SOUNDS
        //this.game.load.image("titleBackground","assets/gameTitleBackground.jpg");
        this.game.load.image("titleBackground","assets/titleBackground.png");
        
        this.game.load.image("play","assets/Home_Screen_Play.png");
        
        this.game.load.image("logo","assets/gameTitleLogo.png");
        
        this.game.load.image("settings","assets/Home_Screen_Settings.png");
        
        this.game.load.image("credits","assets/Home_Screen_Credits.png");
        
        this.game.load.image("signup","assets/Signup.png");
        
        this.game.load.image("newUser","assets/newUser.png");
        
        this.game.load.image("login", "assets/Login.png");
        
        this.game.load.image("stats", "assets/statsButton.png");
        
        this.game.load.image("user", "assets/Users.png");
        
        //Load Audio
        this.game.load.audio("sound", "assets/Autumn Nights.mp3");
        
        
        //WINNER SCREEN IMAGES
        this.game.load.image("Thanks_Logo","assets/Thanks_Logo.png");
        
        this.game.load.image("Win_Logo","assets/Win_Logo.png");
        
        this.game.load.audio("Winning_Sound", "assets/Winning_Sound.wav");
        
        //LEVEL BOARD SELECTION IMAGES
        this.game.load.image("Level 1","assets/LEVEL1.png"); 
        
        this.game.load.image("Level 2","assets/LEVEL2.png"); 
        
        this.game.load.image("Level 3","assets/LEVEL3.png"); 
        
        this.game.load.image("Level 4","assets/LEVEL4.png"); 
        
        this.game.load.image("Level 5","assets/LEVEL5.png"); 
        
        //GAMEOVER IMAGES
        this.game.load.image("Gameover_Home",
        "assets/Gameover_Home.png");   
        this.game.load.image("Gameover_Label","assets/Game_Over_Pink.png");
        this.game.load.image("submitButton", "assets/submit.png");
        
        
        //LEADERBOARD/STATS IMAGES & JSON
        this.game.load.image('leaderboard_background_image', "assets/space_background.jpg");
        
        this.game.load.text('leaderboard_JSON', "assets/game_data/leaderboard.json");
        
        this.game.load.image('home_button_image',"assets/home_button.png");
        
        this.game.load.image('High_Scores_Label',"assets/High_Scores_Label.png");
        
        this.game.load.text('stats_JSON', "assets/game_data/statistics.json");

        
        
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
        
        //SIGNUP SCREEN IMAGES
        this.game.load.image("createUser","assets/createUser.png");
        
        this.game.load.image("cancel","assets/.png");
           
        
        
        /*LEVEL 1 IMAGES, SOUNDS, & JSON  To increase number of files read 
        for this level or any level must use this.game.load.text( string for the file
        here)
        */
        this.game.load.text('level_1_JSON', "assets/game_data/level_1_data.json");
        
        this.game.load.image("heart","assets/heart.png");
        
        this.game.load.image("level1Background","assets/Space_Level1.png");
        
        this.game.load.image("menu","assets/Resume_Quit_Button.png");
        
        this.game.load.image("spaceCraft", "assets/rocket.png");
        
        this.game.load.image("bullet", "assets/Bullets.png");
        
        this.game.load.image("asteroid", "assets/Asteroids.png");
        
        this.game.load.image("checkMark", "assets/checkMark.png");
        
        this.game.load.image("xMark", "assets/xMark.png");
        
        this.game.load.image("Pause_Button","assets/Pause_Button_Redesign.png");
        
        this.game.load.image("planets_Background","assets/planets_Background.jpg");
        
        this.game.load.image("rain_Background","assets/rain_Background.png");
        
        this.game.load.image("Space_Land_Background","assets/Space_Land_Background.png");
        
        //Load Audio
        this.game.load.audio("correctSound", "assets/correctSound.wav");
        
        this.game.load.audio("wrongSound", "assets/wrongSound.wav");
        
        this.game.load.audio("bulletSound", "assets/bulletSound.wav");
        
        this.game.load.audio("shortBeep", "assets/shortBeep.wav");
        
        this.game.load.audio("longBeep", "assets/longBeep.wav");
        
        this.game.load.audio("levelMusic", "assets/levelMusic.wav");
        

    
        
        //LEVEL 2 IMAGES, SOUNDS, & JSON
        
        this.game.load.image('level_2_background_image', "assets/bubble background.png");
        
        this.game.load.image('bubble_image', "assets/bubble256.png");
        
        // JSON file as a text file
        this.game.load.text('level_2_JSON', "assets/game_data/level_2_data.json");
        
        // spike image
        this.game.load.image('spike_image', "assets/spikes.png");
        
        // bubble image for  emitter
        this.game.load.image('emitter_bubble_image', "assets/bubble.png");
        
        
        //LEVEL 3 IMAGES & SOUNDS
	    this.game.load.text('level_3_JSON', "assets/game_data/level_3_data.json");
        
        this.game.load.image('NebulaWeb', "assets/NebulaWeb.png");
        
        this.game.load.image('spider', "assets/gardenSpider1.png");
        
        this.game.load.image('spider1', "assets/gardenSpider2.png");
        
        this.game.load.image('spider2', "assets/gardenSpider3.png");
        
        this.game.load.image('fly1', "assets/flyy2.png");
        
        this.game.load.image('fly2', "assets/flyy1.png");
    
        this.game.load.image('fly3', "assets/flyy3.png");
        
        this.game.load.spritesheet('fly4', "assets/flySprite1.png");
        
        
        
        
        //LEVEL 4 IMAGES & SOUNDS
        this.game.load.image('level_4_background_image', "assets/level_4_background.jpg");
        
        this.game.load.text('level_4_JSON', "assets/game_data/level_4_data.json");
        
        this.game.load.text('level_4_JSON_series_2', "assets/game_data/level_4_data_series_2.json");
        
		this.game.load.text('level_4_JSON_series_3', "assets/game_data/level_4_data_series_3.json");
		
		this.game.load.text('level_4_JSON_series_4', "assets/game_data/level_4_data_series_4.json");
		
		this.game.load.text('level_4_JSON_series_5', "assets/game_data/level_4_data_series_5.json");
		
		this.game.load.text('level_4_JSON_series_6', "assets/game_data/level_4_data_series_6.json");
		
        //LEVEL 5 IMAGES, SOUNDS, & JSON
        this.game.load.image("level5Background","assets/Lab_Background.jpg");
        
        this.game.load.text('level_5_JSON', "assets/game_data/level_5_data.json");
        
        this.game.load.text('level_5_JSON_series_2', "assets/game_data/level_5_data_series_2.json");
        
        this.game.load.text('level_5_JSON_series_3', "assets/game_data/level_5_data_series_3.json");
        
        this.game.load.text('level_5_JSON_series_4', "assets/game_data/level_5_data_series_4.json");
        
        this.game.load.text('level_5_JSON_series_5', "assets/game_data/level_5_data_series_5.json");
        
        this.game.load.image("blueFlask", "assets/blue_flask.png");
        
        this.game.load.image("greenFlask", "assets/green_flask.png"); 
        
        this.game.load.image("redFlask", "assets/red_flask.png"); 
        
        this.game.load.image("purpleFlask", "assets/purple_flask.png"); 
        
        this.game.load.image("orangeFlask", "assets/orangeFlask.png"); 

        this.game.load.spritesheet("guy", "assets/man_walking.png", 124, 254);
        
        this.game.sha1 = this.sha1;
        
        this.game.loggedIn = false; 
        
	},
    
    
    sha1:function(msg){
        function rotl(n, s) {
            return n << s | n >>> 32 - s;
        };

        function tohex(i) {
            for (var h = "", s = 28;; s -= 4) {
                h += (i >>> s & 0xf).toString(16);
                if (!s) return h;
            }
        };
        var H0 = 0x67452301,
            H1 = 0xEFCDAB89,
            H2 = 0x98BADCFE,
            H3 = 0x10325476,
            H4 = 0xC3D2E1F0,
            M = 0x0ffffffff;
        var i, t, W = new Array(80),
            ml = msg.length,
            wa = new Array();
        msg += String.fromCharCode(0x80);
        while (msg.length % 4) msg += String.fromCharCode(0);
        for (i = 0; i < msg.length; i += 4) wa.push(msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3));
        while (wa.length % 16 != 14) wa.push(0);
        wa.push(ml >>> 29), wa.push((ml << 3) & M);
        for (var bo = 0; bo < wa.length; bo += 16) {
            for (i = 0; i < 16; i++) W[i] = wa[bo + i];
            for (i = 16; i <= 79; i++) W[i] = rotl(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            var A = H0,
                B = H1,
                C = H2,
                D = H3,
                E = H4;
            for (i = 0; i <= 19; i++) t = (rotl(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
            for (i = 20; i <= 39; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
            for (i = 40; i <= 59; i++) t = (rotl(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
            for (i = 60; i <= 79; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
            H0 = H0 + A & M;
            H1 = H1 + B & M;
            H2 = H2 + C & M;
            H3 = H3 + D & M;
            H4 = H4 + E & M;
        }
        return tohex(H0) + tohex(H1) + tohex(H2) + tohex(H3) + tohex(H4);
    },    
    
    
    
    //Main Phaser Create Function
  	create: function(){
        //Starts Game Intro
		this.game.state.start("GameIntro");
    }
    
};