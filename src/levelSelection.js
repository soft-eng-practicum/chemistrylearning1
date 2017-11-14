var levelSelectState = function(game) {

};

var levelSelectBackground;
var level1Button;
var level2Button;
var level3Button;
var level4Button;
var level5Button;
var homeButton;
var music;

levelSelectState.prototype = {

    //Create Function
    create: function() {
        
        //Creating the Background with the title one for now, coppied from the gameTitleState file
        levelSelectBackground = this.game.add.sprite(0,0,"titleBackground");
        levelSelectBackground.scale.setTo(1, 1.35);
        
        //Creating the level 1 Button
        level1Button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100,"Level 1", this.playLevel1,this);
        level1Button.scale.setTo(1, 1);
        
        //Creating the Level 2 Button
        level2Button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 30,"Level 2", this.playLevel2,this);
        level2Button.scale.setTo(1, 1);
        
        //Creating the Level 3 Button
        level3Button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 40,"Level 3", this.playLevel3,this);
        level3Button.scale.setTo(1, 1);
        
        //Creating the Level 4 Button
        level4Button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 110,"Level 4", this.playLevel4,this);
        level4Button.scale.setTo(1, 1);
        
        //Creating the Level 5 Button
        level5Button = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 180,"Level 5", this.playLevel5,this);
        level5Button.scale.setTo(1, 1);
        
        /*Creating the "Return Home" Button
        * I made it significantly lower than the Level buttons because I feel that is more natural
        */
        homeButton = this.game.add.button(this.game.world.centerX-95, this.game.world.centerY + 280,"Gameover_Home",this.returnToMain,this);
        homeButton.scale.setTo(1, 1);
        
          //Starts the Game Sound 
        if (!music.isPlaying){  
            music.loop = true;
            music.volume = .2;
            music.play();
            winMusic.pause();
        }
        else{
            
        }
    },
    
    //***ALL console.logs here are to show me what button I'm pressing. They will be removed once a graphic is in place *******//
    
    //Function: playLevel1() to start level 1
    playLevel1: function() {
        this.game.state.start("Level1");
        console.log("Level 1");
    },
    
    //Function: playLevel2() to start level 2
    playLevel2: function() {
        this.game.state.start("Level2");
        console.log("Level 2");
    },
    
    //Function: playLevel3() to start level 3
    playLevel3: function() {
        this.game.state.start("Level3");
        console.log("Level 3");
    },
    
    //Function: playLevel4() to start level 4
    playLevel4: function() {
        this.game.state.start("Level4");
        console.log("Level 4");
    },
    
    //Function: playLevel5() to start level 5
    playLevel5: function() {
        this.game.state.start("Level5");
        console.log("Level 5");
    },
    
    //Function: returnToMain() to return to the main menu
    returnToMain: function() {
        this.game.state.start("GameTitle");
        console.log("Return Home");
    }

};