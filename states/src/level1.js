var level1 = function(game){
    
};

var level_2_Transition = false;
var level_5_Transition = false;
var levelBackground;
var countDownLabel;
var scoreLabel;
var instructions;
var timer;
var started = false;

var moveTimer;
var moveCount = 0;
var isUp = false;
var isDown = true;
var counter = 5;

var asteroid;
var asteroidTween;
var bullets;
var bulletTime = 0;
var isFiring = true;
var text1, text2, text3;
var a1, a2, a3;
var score;

var pause_label;
var choiceLabel;
var menu;
var resumeButton;
var quitButton;
var pauseW = 30;
var pauseH = 600;
var pauseBackground;

var phaserJSON;
var randomElement;
var randomFormula;
var correct = false;
var wrong = false;

var paused = 150;
var isTimerPaused = false;
var checkMark;
var xMark;
var pos1 = false;
var pos2 = false;

var heart1;
var heart2;
var heart3;
var lives = 3;

var switchJSON;

var correctSound;
var wrongSound;
var bulletSound;

var shortBeep;
var longBeep;
//var levelMusic;

level1.prototype = {  
   
    //Main Phaser Create Function
  	create: function(){ 
        
        //Creating JSON
        
        switchJSON = Math.floor(Math.random() * 3);
        
        if(switchJSON == 0){
            level_1_data = JSON.parse(this.game.cache.getText('level_1_JSON')); 
        }
        else if(switchJSON == 1){
            level_1_data = JSON.parse(this.game.cache.getText('level_1_JSON_series_2'));
        }  
        else if(switchJSON == 2){
            level_1_data = JSON.parse(this.game.cache.getText('level_1_JSON_series_3'));
        }
        
        //Pauses the Game Title Music when Game starts
        music.pause();
        
        //Starts the Level Sound 
        //if (!music.isPlaying){  
           levelMusic.loop = true;
           levelMusic.volume = .2;
           levelMusic.play();
      //  }
       
                
        //Creates the Background Image
        levelBackground =  this.game.add.sprite(0,0,"level1Background");
        levelBackground.scale.setTo(.83,1.12);
        
        //Creates the Countdown Label
        countDownLabel = this.game.add.text(this.game.world.centerX-60, 10, "", {font: "120px Courier", fill: "#ffffff"});
        
        //Creates the Instructions Label
        instructions = this.game.add.text(this.game.world.centerX-290, 130, "Destroy The Correct Asteroid", {font: "34px Courier", fill: "#ffffff"});
        
        //Creates short and long beeps for countdown
        shortBeep = this.game.add.audio("shortBeep");
        shortBeep.volume = .1;
        
        longBeep = this.game.add.audio("longBeep");
        longBeep.volume = .1;
        
        //Creates random numbers to randomize answers to the questions
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);
    
        //Creates and starts the Game Clock timer, counting every second
	    timer = this.game.time.create(false);
        timer.loop(1000, this.updateCounter, this);
        timer.start();
       
        //Creates the Score Label
        scoreLabel = this.game.add.text(this.game.width-195, 30, "Score: ", {font: "30px Courier", fill: "Yellow"});
        
        //Declaring and setting text to Score
        score = 0;
        scoreLabel.setText("Score: " + score);
        
        //Spacecraft created
        this.spaceCraft = this.game.add.sprite(10, 200,"spaceCraft");
        this.spaceCraft.scale.setTo(0.5, 0.6);
        this.game.physics.enable(this.spaceCraft, Phaser.Physics.ARCADE);
        
        //Spaceship move timer
        moveTimer = this.game.time.create(false);
        moveTimer.loop(1, this.updateMove, this);
        moveTimer.start();
        
        //Creating a Group of Asteroids
        asteroid = this.game.add.group();
        asteroid.enableBody = true;
        asteroid.physicsBodyType = Phaser.Physics.ARCADE;
        asteroid.inputEnabled = true;
        
        //Created 3 Asteroids from Group
        a1 = asteroid.create(this.game.width-160, this.game.height-610, "asteroid"); 

        a2 = asteroid.create(this.game.width-160, this.game.height-390, "asteroid"); 

        a3 = asteroid.create(this.game.width-160, this.game.height-170, "asteroid"); 

        //Sets styling for Text Answers on Asteroids
        var style = { font: "37px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a1.width, align: "center", backgroundColor: "" };
        
        var style = { font: "37px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a2.width, align: "center", backgroundColor: "" };
        
        var style = { font: "37px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a3.width, align: "center", backgroundColor: "" };

        //Creates Text1 on Asteroids
        text1 = this.game.add.text(a1.x, a1.y, "", style, asteroid);
        text1.anchor.set(0.35);
        
        //Positions Text1
        text1.x = Math.floor((a1.x + a1.width / 2) - 5);
        text1.y = Math.floor(a1.y + a1.height / 2);

        //Creates Text2 on Asteroids
        text2 = this.game.add.text(a2.x, a2.y, "", style, asteroid);
        text2.anchor.set(0.35);
        
        //Positions Text2
        text2.x = Math.floor((a2.x + a2.width / 2) - 5);
        text2.y = Math.floor(a2.y + a2.height / 2);

        //Creates Text3 on Asteroids
        text3 = this.game.add.text(a3.x, a3.y, "", style, asteroid);
        text3.anchor.set(0.35);

        //Positions Text3
        text3.x = Math.floor((a3.x + a3.width / 2) - 5);
        text3.y = Math.floor(a3.y + a3.height / 2);
        
        //Creates check marks for right answers
        checkMark = this.game.add.sprite(0, 0,"checkMark");
        checkMark.visible = false;
        checkMark.scale.setTo(0.6, 0.6);
        checkMark.anchor.set(0, 1.6);
        
        //Creates check marks for right answers
        xMark = this.game.add.sprite(a1.x, a1.y,"xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);
        
        xMark = this.game.add.sprite(a2.x, a2.y,"xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);
        
        xMark = this.game.add.sprite(a3.x, a3.y,"xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);
        xMark.anchor.set(0.4, 0.8);
        
        //Creates Hearts for Lives 
        heart1 = this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY-320,"heart");

        heart2 = this.game.add.sprite(this.game.world.centerX+170, this.game.world.centerY-320,"heart");
        
        heart3 = this.game.add.sprite(this.game.world.centerX+220, this.game.world.centerY-320,"heart");
        
        //Creates Bullets Group
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, "bullet");
        bullets.setAll("anchor.x", -.8);
        bullets.setAll("anchor.y", -1.5);
        bullets.setAll("outOfBoundsKill", true);
        bullets.setAll("checkWorldBounds", true);
        
        //Creates audio
        correctSound = this.game.add.audio("correctSound");
        correctSound.volume = .1;
        
        wrongSound = this.game.add.audio("wrongSound");
        wrongSound.volume = .1;
        
        bulletSound = this.game.add.audio("bulletSound");
        bulletSound.volume = .3;
        
       // levelMusic = this.game.add.audio("levelMusic");
        
        //Resets time and delay for formulas
        counter = 5;
        isDown = true;
        isTimerPaused = false;
        lives = 3;
        correct = false;
        wrong = false;
        isFiring = true;
        pos1 = false;
        pos2 = false;
        level_2_Transition = true;
                  
        //Code for the pause menu
        //Create a pause label to use as a button
        pause_label = this.game.add.sprite(30, 40, "Pause_Button");
        pause_label.scale.setTo(1,1);
        pause_label.inputEnabled = true;

        pause_label.events.onInputUp.add(function() {
            //When the pause button is pressed, the game is paused
            this.game.paused = true;
            
            pauseBackground = this.game.add.sprite(0,0,"space_background");
            pauseBackground.scale.setTo(.6, .8);

            //Creates the pause menu picture
            menu = this.game.add.sprite(pauseW/2 + 135, pauseH/2 + 90, "menu");
            menu.anchor.setTo(1, 1);

        });

    // An input listener that returns from being paused
    this.game.input.onDown.add(unpause, self);

    /*Function: unpause(event)
    *
    *Handles the functions in the pause menu
    */
    function unpause(event) {
        // Only act if paused
        if (this.game.paused) {
            
            //calculate corners of menu
            var x1 = pauseW/2 - 270/2, x2 = pauseW/2 + 270/2,
                y1 = pauseH/2 - 180/2, y2 = pauseH/2 + 180/2;
            
            //Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2){
                var choiceMap = ['Resume', 'Resume', 'Resume', 'Quit', 'Quit', 'Quit'];
                
                var x = event.x - x1;
                var y = event.y - y1;
                
                var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);
                
                if(choiceMap[choice] == "Quit"){
                    this.game.paused = false;
                    this.game.state.start("GameOver");
                }
                if(choiceMap[choice] == "Resume"){
                    pauseBackground.visible = false;
                    this.game.paused = false;
                    menu.destroy();
                }
            }
          }
        };
    },
    
    
    /*Function: playTheGame()
    *
    *Kills or Destroys the Pause Menu
    */
    playTheGame: function(){
        //menu.destroy();
        //choiceLabel.destroy();
        resumeButton.destroy();
       // quitButton.destroy();
        
        this.game.paused = false;
    },

    
    
    

    
    /*Function: update()
    *
    *Main Phaser Update Function
    */
    update: function () {
        
        //Spacecraft Movement Up and Down
        if(started) {
            if(isDown) {
                this.spaceCraft.y += moveCount;

                if(this.spaceCraft.y >= (this.game.height - 120)) {
                    isDown = false;
                    isUp = true;  
                }
            }

            if(isUp) {
                this.spaceCraft.y -= moveCount;

                if(this.spaceCraft.y <= 140) {
                    isUp = false;
                    isDown = true;
                }
            }

            //Controls the delay in speed of the Spacecraft
            if(moveCount > 1) {
                moveCount = 0;
            }
            
            //Stopping score from being Negative
            if(score < 0){
                score = 0;
            }

            //Fires weapon
            if (this.game.input.activePointer.isDown) {
                if(isFiring){
                    this.fireBullet();
                }
            }
        }
        
        //Sets score to Score label
        scoreLabel.setText("Score: " + score);
        
        //Applies overlap physics for Collision of Bullets & Asteroids
        this.game.physics.arcade.overlap(bullets, asteroid, this.collisionHandlerBullet, null, this);
        
        //Applies overlap physics for Collision of Spacecraft & Asteroids
        this.game.physics.arcade.overlap(this.spaceCraft, asteroid, this.collisionHandlerSpaceCraft, null, this);

        //Retrieves data when game starts
        if(started) {
            this.handleData(); 
        }
        
        //Deduct lives with each wrong answer
        if(lives == 2){
            heart1.visible = false;
        }
        else if(lives == 1){
            heart2.visible = false;
        }
        else if(lives == 0){            
            this.game.state.start("GameOver");
        }
    },
    
    
    /*Function: fireBullet()
    *
    *Fires bullets
    */
    fireBullet: function() {

        if (this.game.time.now > bulletTime) {

                bullet = bullets.getFirstExists(false);

            if (bullet) {
                // Location from where the bullet is being fired
                bullet.reset(this.spaceCraft.x + 85, this.spaceCraft.y);
                // Set the y component of velocity
                bullet.body.velocity.x = 800;
                // Set the time between the bullets to the current time + 200
                bulletTime = this.game.time.now + 1200;
                
                bulletSound.play();
             }
         }
    },
    
    
    /*Function: fireBullet()
    *
    *Bullet and Asteroid Collision detection
    */
    collisionHandlerBullet: function(bullet, asteroid) {
        asteroid.visible = false;
        bullet.kill(); 
        
        if(asteroid.visible == false){
            
            if(asteroid.y == 200){   
                text1.visible = false;
            }
            if(asteroid.y == 380){   
                text2.visible = false;
            }
            if(asteroid.y == 560){   
                text3.visible = false;
            }
        }
    },
    
    
    /*Function: collisionHandlerSpaceCraft()
    *
    *SpaceCraft and Asteroid Collision
    */
    collisionHandlerSpaceCraft: function(spaceCraft, asteroid) {
        spaceCraft.kill();
    },

    
    /*Function: render()
    *
    *Renders labels and colors in the level
    */
    render: function() {

        countDownLabel.setText(counter);
        
        //Changes Count Down Label Red
        if(counter <= 5) {
            countDownLabel.addColor("RED", 0);
        }
        else if(counter > 5) {
            countDownLabel.addColor("#ffffff", 0);
        }
    },  

    
    /*Function: updateCounter()
    *
    *Update Time Countdown (Game Timer)
    */
    updateCounter: function() {  
        
        //Game Time not started 
        if(started == false) {
            counter--;
            shortBeep.play();
            
            if(counter < 1){
                shortBeep.pause();
                longBeep.play();
            }
            
            if(counter <= 0) { 
                counter = 10;
                started = true;
            }
        }
        //Game Time has started 
        else if(started == true) {
                counter--;
            
            if(counter < 1) {
                wrongSound.play();
                
                if(lives == 3){
                    lives=2;
                    counter = 10;
                    }
                else if(lives == 2){
                    lives=1;
                    counter = 10;
               }
                else{
                    lives=0;
                    counter = 0;
                }
            }
        }
    },
   
    
    /*Function: updateMove()
    *
    *Controls how fast the Scacecraft moves
    */
    updateMove: function() {            
        //Increment number for spacecraft speed
        moveCount += 7; 
    }, 
    
    
    /*Function: handleData()
    *
    *Handles the data from JSON files, and right and wrong answers
    */
    handleData: function() {
        
        //Adjusting Instruction label color 
        instructions.addColor("Yellow", 0);
        instructions.anchor.setTo(-0.1, 0.2);
               
        if(randomElement == 0){

          instructions.setText(level_1_data.chemical_formulas.formula1.name);
            
          if(level_1_data.chemical_formulas.formula1.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 42;
            }

            if(randomFormula == 0){ 
                text1.setText(level_1_data.chemical_formulas.formula1.right);
                text2.setText(level_1_data.chemical_formulas.formula1.wrong1);
                text3.setText(level_1_data.chemical_formulas.formula1.wrong2);

                //Sets asteroid 1 visible to false
                if(a1.visible == false) {
                     //Sets True if correct answer
                     correct = true; 
                     //Adds score for correct answer
                     score = score + 50;
                     //Sets asteroid 1 visible to true
                     a1.visible = true;
                     //Sets text 1 visible to true
                     text1.visible = true;
                     //Pauses time 
                     timer.pause();
                     //Sets true to display correct answer
                     isTimerPaused = true;
                     //Plays Correct Sound
                     correctSound.play();
                    }
                //Sets asteroid 2 visible to false
                if(a2.visible == false) {
                    //Decrease score
                    score = score - 50;
                    //Looses 1 life 
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    //Sets True if wrong answer
                    wrong = true;
                    //Sets true to display wrong answer
                    isTimerPaused = true;
                    //Pauses time 
                    timer.pause();
                    //Sets asteroid 2 visible to true
                    a2.visible = true;
                    //Sets text 2 visible to true
                    text2.visible = true;
                    //Sets True if its the first wrong answer instead of the second wrong
                    pos1 = true;
                    //Plays Wrong Sound
                    wrongSound.play();
                }
                //Sets asteroid 3 visible to false
                if(a3.visible == false) {
                    //Decrease score
                    score = score - 50;
                    //Looses 1 life 
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    //Sets true to display wrong answer
                    wrong = true;
                    //Sets true to display wrong answer
                    isTimerPaused = true;
                    //Pauses time 
                    timer.pause();
                    //Sets asteroid 3 visible to true
                    a3.visible = true;
                    //Sets text 3 visible to true
                    text3.visible = true;
                    //Sets True if its the second wrong answer instead of the first wrong
                    pos2 = true;
                    //Plays Wrong Sound
                    wrongSound.play();
                    }
                
                //A pause delay to display Correct or Wrong Answers
                if(isTimerPaused){
                    //If correct answer
                    if(correct){
                        paused--;

                        //Set check mark to true and display correct positioning on asteroid
                        checkMark.visible = true;
                        checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                        checkMark.y = Math.floor(a1.y + a1.height / 1.3);

                        //Restores counter back to 10
                        counter = 10;
                    }
                    //If wrong answer
                    if(wrong){
                        paused--;
                        
                        //Set X mark to true and display correct positioning on asteroid
                        xMark.visible = true;
                        
                        //Positon of first wrong answer
                        if(pos1){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }
                        //Positon of second wrong answer
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        //Restores counter back to 10
                        counter = 10; 
                    }
                    //Stops firing when delayed
                    isFiring = false;
                }

                //Stops delay for showing correct or wrong answers
                if(paused < 1){
                    //Selects a random formula for the next sequence
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        //Proceeds to the next Element
                        randomElement = 1;
                    }
                    //Resumes the Timer
                    timer.resume();
                    //Sets check mark visible to false
                    checkMark.visible = false;
                    //Sets X mark visible to false
                    xMark.visible = false;
                    //Sets the pause delay to false to stop pausing
                    isTimerPaused = false;
                    //Sets the position of the first wrong to false
                    pos1 = false;
                    //Sets the position of the second wrong to false
                    pos2 = false;
                    //Resets the pause timer for correct and wrong answers 
                    paused = 150;
                    //Sets the correct answer to false
                    correct = false;
                    //Sets the wrong answer to false
                    wrong = false;
                    //Restores firing
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 1){ 
                text1.setText(level_1_data.chemical_formulas.formula1.wrong3);
                text2.setText(level_1_data.chemical_formulas.formula1.right);
                text3.setText(level_1_data.chemical_formulas.formula1.wrong4);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    text2.visible = true;
                    a2.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 1;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
    
//NEXT FORMULA
            else if(randomFormula == 2){ 
                text1.setText(level_1_data.chemical_formulas.formula1.wrong5);
                text2.setText(level_1_data.chemical_formulas.formula1.wrong6);
                text3.setText(level_1_data.chemical_formulas.formula1.right);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    text3.visible = true;
                    a3.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                        checkMark.visible = true;
                        checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                        checkMark.y = Math.floor(a3.y + a3.height / 1.3);

                        counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 1;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
        }
        
/////////////////////////////////////////////////////////////////////////////////////////
        if(randomElement == 1){
          instructions.setText(level_1_data.chemical_formulas.formula2.name);
            
        if(level_1_data.chemical_formulas.formula2.name.length < 20){

            //Adjusting Instruction label Font Size
            instructions.fontSize = 47;  
        }
        else{
            //Adjusting Instruction label for Chemical Names
            instructions.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            instructions.fontSize = 42;
        }
          

            if(randomFormula == 0){ 
                text1.setText(level_1_data.chemical_formulas.formula2.right);
                text2.setText(level_1_data.chemical_formulas.formula2.wrong1);
                text3.setText(level_1_data.chemical_formulas.formula2.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     timer.pause();
                     isTimerPaused = true;
                     correctSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                    checkMark.y = Math.floor(a1.y + a1.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 2;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 1){ 
                text1.setText(level_1_data.chemical_formulas.formula2.wrong3);
                text2.setText(level_1_data.chemical_formulas.formula2.right);
                text3.setText(level_1_data.chemical_formulas.formula2.wrong4);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 2;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }

//NEXT FORMULA
            else if(randomFormula == 2){ 
                text1.setText(level_1_data.chemical_formulas.formula2.wrong5);
                text2.setText(level_1_data.chemical_formulas.formula2.wrong6);
                text3.setText(level_1_data.chemical_formulas.formula2.right);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true; 
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                        checkMark.visible = true;
                        checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                        checkMark.y = Math.floor(a3.y + a3.height / 1.3);

                        counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 2;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
        }
        
//////////////////////////////////////////////////////////////////////////////////////////
        if(randomElement == 2){
          instructions.setText(level_1_data.chemical_formulas.formula3.name);
            
          if(level_1_data.chemical_formulas.formula3.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 42;
            }

            if(randomFormula == 0){ 
                text1.setText(level_1_data.chemical_formulas.formula3.right);
                text2.setText(level_1_data.chemical_formulas.formula3.wrong1);
                text3.setText(level_1_data.chemical_formulas.formula3.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     timer.pause();
                     isTimerPaused = true;
                     correctSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                    checkMark.y = Math.floor(a1.y + a1.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 3;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 1){ 
                text1.setText(level_1_data.chemical_formulas.formula3.wrong3);
                text2.setText(level_1_data.chemical_formulas.formula3.right);
                text3.setText(level_1_data.chemical_formulas.formula3.wrong4);

                if(a1.visible == false) {
                    score = score - 50;
                   if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true; 
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 3;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 2){ 
                text1.setText(level_1_data.chemical_formulas.formula3.wrong5);
                text2.setText(level_1_data.chemical_formulas.formula3.wrong6);
                text3.setText(level_1_data.chemical_formulas.formula3.right);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                    checkMark.y = Math.floor(a3.y + a3.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 3;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
        }
 
////////////////////////////////////////////////////////////////////////////////////////      
        if(randomElement == 3){
          instructions.setText(level_1_data.chemical_formulas.formula4.name);
            
          if(level_1_data.chemical_formulas.formula4.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 42;
            }

            if(randomFormula == 0){ 
                text1.setText(level_1_data.chemical_formulas.formula4.right);
                text2.setText(level_1_data.chemical_formulas.formula4.wrong1);
                text3.setText(level_1_data.chemical_formulas.formula4.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     timer.pause();
                     isTimerPaused = true;
                     correctSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                    checkMark.y = Math.floor(a1.y + a1.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 4;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 1){ 
                text1.setText(level_1_data.chemical_formulas.formula4.wrong3);
                text2.setText(level_1_data.chemical_formulas.formula4.right);
                text3.setText(level_1_data.chemical_formulas.formula4.wrong4);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true; 
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 4;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 2){ 
                text1.setText(level_1_data.chemical_formulas.formula4.wrong5);
                text2.setText(level_1_data.chemical_formulas.formula4.wrong6);
                text3.setText(level_1_data.chemical_formulas.formula4.right);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                    checkMark.y = Math.floor(a3.y + a3.height / 1.3);
                    
                    counter = 10;
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        randomFormula = Math.floor(Math.random() * 3);
                        randomElement = 4;
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
        }
 
//////////////////////////////////////////////////////////////////////////////////////        
        if(randomElement == 4){
          instructions.setText(level_1_data.chemical_formulas.formula5.name);
            
          if(level_1_data.chemical_formulas.formula5.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 42;
            }

            if(randomFormula == 0){ 
                text1.setText(level_1_data.chemical_formulas.formula5.right);
                text2.setText(level_1_data.chemical_formulas.formula5.wrong1);
                text3.setText(level_1_data.chemical_formulas.formula5.wrong2);

                 if(a1.visible == false) {
                    correct = true;
                    score = score + 50;
                    a1.visible = true;
                    text1.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                    checkMark.y = Math.floor(a1.y + a1.height / 1.3);
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        this.game.state.start("Transition");
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
            
//NEXT FORMULA
            else if(randomFormula == 1){ 
                text1.setText(level_1_data.chemical_formulas.formula5.wrong3);
                text2.setText(level_1_data.chemical_formulas.formula5.right);
                text3.setText(level_1_data.chemical_formulas.formula5.wrong4);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                if(a3.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a3.visible = true;
                    text3.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                            xMark.y = Math.floor(a3.y + a3.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }
                

                if(paused < 1){
                    if(correct){
                        this.game.state.start("Transition");
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
                
            }
            
//NEXT FORMULA
            else if(randomFormula == 2){ 
                text1.setText(level_1_data.chemical_formulas.formula5.wrong5);
                text2.setText(level_1_data.chemical_formulas.formula5.wrong6);
                text3.setText(level_1_data.chemical_formulas.formula5.right);

                if(a1.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a1.visible = true;
                    text1.visible = true;
                    pos1 = true;
                    wrongSound.play();
                }
                if(a2.visible == false) {
                    score = score - 50;
                    if(lives == 2){
                        lives=1;
                    }
                    else if(lives == 1){
                        lives=0;
                    }
                    else{
                        lives=2;
                    }
                    wrong = true;
                    isTimerPaused = true;
                    timer.pause();
                    a2.visible = true;
                    text2.visible = true;
                    pos2 = true;
                    wrongSound.play();
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    timer.pause();
                    isTimerPaused = true;
                    correctSound.play();
                }
                                
                if(isTimerPaused){
                    paused--;

                    if(correct){
                    checkMark.visible = true;
                    checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                    checkMark.y = Math.floor(a3.y + a3.height / 1.3);
                    }
                    if(wrong){
                        paused--;
                        xMark.visible = true;

                        if(pos1){
                            xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                            xMark.y = Math.floor(a1.y + a1.height / 1.3);
                        }
                        if(pos2){
                            xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                            xMark.y = Math.floor(a2.y + a2.height / 1.3);
                        }

                        counter = 10;    
                    }
                    isFiring = false;
                }

                if(paused < 1){
                    if(correct){
                        this.game.state.start("Transition");
                    }
                    timer.resume();
                    checkMark.visible = false;
                    xMark.visible = false;
                    isTimerPaused = false;
                    pos1 = false;
                    pos2 = false;
                    paused = 150;
                    correct = false;
                    wrong = false;
                    isFiring = true;
                }
            }
        } 
    }
};