var level1 = function(game){
    
};

// Create transition variables and set them to false
var level_2_Transition = false;


//Creates the level's background
var levelBackground;
//This is the label that displays the counter's number
var countDownLabel;
//This is the label that displays the player's score
var scoreLabel;
//This variable displays the instructions and then the formula name
var instructions;
//This is the timer for all events such as how long you have to get
//a question right, how long the game pauses, and if the game is paused
var timer;
<<<<<<< HEAD
//This determines if the game has started or not
var gameStarted = false;

//This is the timer associated with the spacecraft
var spaceShipTimer;
//This determines how fast the spaceship moves
var spaceshipSpeed = 0;
//This determines if the spaceship is supposed to move up
var moveUp = false;
//This determines if the spaceship is supposed to move down
var moveDown = true;
//The counter that determines how much time you have left to
//either start a round/level or how long it'll be until
//the game unpauses from a wrong or right answer being selected
var counter = 5;

//This is a group that contains all of the asteroids
var asteroidGroup;
//
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
var a1CheckLocation = false;
var a2CheckLocation = false;
var a3CheckLocation = false;
var xMark;
var a1XLocation = false;
var a2XLocation = false;
var a3XLocation = false;

var heart1;
var heart2;
var heart3;
var lives = 3;

var correctSound;
var wrongSound;
var bulletSound;

var shortBeep;
var longBeep;
//var levelMusic;

//A variable to track the length of "instructions" text
var instructionsLength;

//A variable to set a random first wrong answer
var randomWrong1;
//A variable to set a random second wrong answer
var randomWrong2;

//Creating the booleans that will track if an asteroid is wrong or correct
var a1Correct;
var a1Wrong1;
var a2Correct;
var a2Wrong1;
var a2Wrong2;
var a3Correct;
var a3Wrong2;

//This is the length of the json array so that it will automatically work with json file changes
var jsonLength;
//A count to determine if the player can proceed to the next level
var correctCount = 0;

level1.prototype = {  
   
    //Main Phaser Create Function
  	create: function(){ 
        //Adding the JSON file in
        level_1_data = JSON.parse(this.game.cache.getText('level_1_JSON')); 
        
        //Pauses the Game Title Music when Game starts
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();
    
                
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
        spaceShipTimer = this.game.time.create(false);
        spaceShipTimer.loop(1, this.updateMove, this);
        spaceShipTimer.start();
        
        //Creating a Group of Asteroids
        asteroidGroup = this.game.add.group();
        asteroidGroup.enableBody = true;
        asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;
        asteroidGroup.inputEnabled = true;
        
        //Created 3 Asteroids from Group
        a1 = asteroidGroup.create(this.game.width-160, this.game.height-610, "asteroid"); 

        a2 = asteroidGroup.create(this.game.width-160, this.game.height-390, "asteroid"); 

        a3 = asteroidGroup.create(this.game.width-160, this.game.height-170, "asteroid"); 

        //Sets styling for Text Answers on Asteroids
        var style = { font: "37px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a1.width, align: "center", backgroundColor: "" };
        
        //Creates Text1 on Asteroids
        text1 = this.game.add.text(a1.x, a1.y, "", style, asteroidGroup);
        text1.anchor.set(0.35);
        
        //Positions Text1
        text1.x = Math.floor((a1.x + a1.width / 2) - 5);
        text1.y = Math.floor(a1.y + a1.height / 2);

        //Creates Text2 on Asteroids
        text2 = this.game.add.text(a2.x, a2.y, "", style, asteroidGroup);
        text2.anchor.set(0.35);
        
        //Positions Text2
        text2.x = Math.floor((a2.x + a2.width / 2) - 5);
        text2.y = Math.floor(a2.y + a2.height / 2);

        //Creates Text3 on Asteroids
        text3 = this.game.add.text(a3.x, a3.y, "", style, asteroidGroup);
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
        moveDown = true;
        isTimerPaused = false;
        lives = 3;
        correct = false;
        wrong = false;
        isFiring = true;
        a1XLocation = false;
        pos2 = false;
        level_2_Transition = true;
                  
        //Code for the pause menu
        //Create a pause label to use as a button
        pause_label = this.game.add.sprite(30, 30, "Pause_Button");
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
            
            //Setting all my correct/wrong booleans to false
            a1Correct = false;
            a1Wrong1 = false;
            a2Correct = false;
            a2Wrong1 = false;
            a2Wrong2 = false;
            a3Correct = false;
            a3Wrong2 = false;
            
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
        resumeButton.destroy();
        
        this.game.paused = false;
    },


    /*Function: update()
    *
    *Main Phaser Update Function
    */
    update: function () {
        
        //Spacecraft Movement Up and Down
        if(gameStarted) {
            if(moveDown) {
                this.spaceCraft.y += spaceshipSpeed;

                if(this.spaceCraft.y >= (this.game.height - 120)) {
                    moveDown = false;
                    moveUp = true;  
                }
            }

            if(moveUp) {
                this.spaceCraft.y -= spaceshipSpeed;

                if(this.spaceCraft.y <= 140) {
                    moveUp = false;
                    moveDown = true;
                }
            }

            //Controls the delay in speed of the Spacecraft
            if(spaceshipSpeed > 1) {
                spaceshipSpeed = 0;
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
        this.game.physics.arcade.overlap(bullets, asteroidGroup, this.collisionHandlerBullet, null, this);
        
        //Applies overlap physics for Collision of Spacecraft & Asteroids
        this.game.physics.arcade.overlap(this.spaceCraft, asteroidGroup, this.collisionHandlerSpaceCraft, null, this);

        //Retrieves data when game starts
        if(gameStarted) {
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
            correctCount = 0;
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
    collisionHandlerBullet: function(bullet, asteroidGroup) {
        asteroidGroup.visible = false;
        bullet.kill(); 
        
        if(asteroidGroup.visible == false){
            
            if(asteroidGroup.y == 200){   
                text1.visible = false;
            }
            if(asteroidGroup.y == 380){   
                text2.visible = false;
            }
            if(asteroidGroup.y == 560){   
                text3.visible = false;
            }
        }
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
        
        //Game Time not gameStarted 
        if(gameStarted == false) {
            counter--;
            shortBeep.play();
            
            if(counter < 1){
                shortBeep.pause();
                longBeep.play();
                
            }
            
            if(counter <= 0) { 
                counter = 10;
                gameStarted = true;
                this.setQuestion();
            }
        }
        //Game Time has gameStarted 
        else if(gameStarted == true) {
            counter--;
            
            if(counter < 1) {
                wrongSound.play();
                
                lives--;
                counter = 10;
            }
        }
    },
   
    
    /*Function: updateMove()
    *
    *Controls how fast the Scacecraft moves
    */
    updateMove: function() {            
        //Increment number for spacecraft speed
        spaceshipSpeed += 7; 
    }, 
    
    
    /*Function: handleData()
    *
    *Handles the data from JSON files, and right and wrong answers
    */
    handleData: function() {
        //Sets asteroid 1 visible to false
        if((a1.visible == false && a1Correct) || 
           (a2.visible == false && a2Correct ) ||
           (a3.visible == false && a3Correct)) {
            //Sets True if correct answer
            correct = true; 
            //Adds score for correct answer
            score = score + 50;
            //Sets asteroid 1 visible to true
            if(a1.visible == false) {
                a1.visible = true;
                //Sets text 1 visible to true
                text1.visible = true;
                a1CheckLocation = true;
            }
            if(a2.visible == false) {
                a2.visible = true;
                text2.visible = true;
                a2CheckLocation = true;
            }
            if(a3.visible == false) {
                a3.visible = true;
                text3.visible = true;
                a3CheckLocation = true;
            }
            //Pauses time 
            timer.pause();
            //Sets true to display correct answer
            isTimerPaused = true;
            //Plays Correct Sound
            correctSound.play(); 
        }
        //Sets asteroid 2 visible to false
        //I've separated the conditions to make it more readable
        if((a1.visible == false && a1Wrong1) || 
           (a2.visible == false && a2Wrong1) || 
           (a2.visible == false && a2Wrong2) || 
           (a3.visible == false && a3Wrong2)) {
            if(a1.visible == false) {
                //Sets text 2 visible to true
                text2.visible = true;
                //Sets True if its the first wrong answer instead of the second wrong
                a1XLocation = true;
                //Sets asteroid 2 visible to true
                a1.visible = true;
            }
            if(a2.visible == false) {
                //Shows the text3
                text2.visible = true;
                //Sets true if it's the second wrong answer instead of the first wrong
                a2XLocation = true;
                //Sets asteroid 3 visible to true
                a2.visible = true;
            }
            if(a3.visible == false) {
                text3.visible = true;
                a3XLocation = true;
                a3.visible = true;
            }
            //Decrease score
            score = score - 50;
            //Looses 1 life 
            lives --;
            //Sets True if wrong answer
            wrong = true;
            //Sets true to display wrong answer
            isTimerPaused = true;
            //Pauses time 
            timer.pause();
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
                
                if(a1CheckLocation) {
                 checkMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                 checkMark.y = Math.floor(a1.y + a1.height / 1.3);
                }
                if(a2CheckLocation) {
                 checkMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                 checkMark.y = Math.floor(a2.y + a2.height / 1.3);
                }
                if(a3CheckLocation) {
                 checkMark.x = Math.floor((a3.x + a3.width / 2) - 15);
                 checkMark.y = Math.floor(a3.y + a3.height / 1.3);
                }

                  //Restores counter back to 10
                  counter = 10;
            }
            //If wrong answer
            if(wrong){
                paused--;
                //Set X mark to true and display correct positioning on asteroid
                xMark.visible = true;
                
                //Position of the first wrong answer
                if(a1XLocation) {
                    xMark.x = Math.floor((a1.x + a1.width / 2) - 15);
                    xMark.y = Math.floor(a1.y + a1.height / 1.3);
                }
                
                //Positon of second wrong answer
                if(a2XLocation){
                    xMark.x = Math.floor((a2.x + a2.width / 2) - 15);
                    xMark.y = Math.floor(a2.y + a2.height / 1.3);
                }
                //Positon of third wrong answer
                if(a3XLocation){
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
                correctCount++;
//To change the number of questions that need to be answered correctly, change the number for correctCount >= numRight
                if(correctCount >= 5) {
                   this.game.state.start("Transition");
                    correctCount = 0;
                }
                 this.setQuestion();
            }
            //Resumes the Timer
            timer.resume();
            //Sets check mark visible to false
            checkMark.visible = false;
            //Sets X mark visible to false
            xMark.visible = false;
            //Sets the pause delay to false to stop pausing
            isTimerPaused = false;
            
        //Resetting all the booleans
            //Sets the position of the check mark locations to false
            a1CheckLocation = false;
            a2CheckLocation = false;
            a3CheckLocation = false;
            //Sets the positions of the X mark locations to false
            a1XLocation = false;
            a2XLocation = false;
            a3XLocation = false
            //Resets the pause timer for correct and wrong answers 
            paused = 150;
            //Sets the correct answer to false
            correct = false;
            //Sets the wrong answer to false
            wrong = false;
            //Restores firing
            isFiring = true;
        }
    },
    
    setQuestion: function() {
        //In order to add more questions, change randomElement random number generator to the number of questions you have
        randomElement = Math.floor(Math.random() * 20);
        console.log("The random Element is: " + randomElement);
        
        randomFormula = Math.floor(Math.random() * 3);

        //Setting the random wrong answer 1
        randomWrong1 = Math.floor(Math.random() * 4);
        //Setting the random wrong answer 2
        randomWrong2 = Math.floor(Math.random() * 4);
        //Making sure the two wrong answers are matching
        while(randomWrong1 == randomWrong2) {
           randomWrong2 = Math.floor(Math.random() * 4); 
        }
        //Adjusting Instruction label color 
        instructions.addColor("Yellow", 0);
        instructions.anchor.setTo(-0.1, 0.2);
         
        console.log(level_1_data);
        //Resetting all my correct/wrong booleans to false
        a1Correct = false;
        a1Wrong1 = false;
        a2Correct = false;
        a2Wrong1 = false;
        a2Wrong2 = false;
        a3Correct = false;
        a3Wrong2 = false;
        
        //Choosing the formula
        instructions.setText(level_1_data.formulas[randomElement].formulaName);
        instructionsLength = instructions.length;
            
            if(randomFormula == 0){
                text1.setText(level_1_data.formulas[randomElement].right);
                a1Correct = true;
                text2.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
                a2Wrong1 = true;
                text3.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
                a3Wrong2 = true;
            }
            if(randomFormula == 1) {
                text1.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
                a1Wrong1 = true;
                text2.setText(level_1_data.formulas[randomElement].right);
                a2Correct = true;
                text3.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
                a3Wrong2 = true;
            }
            if(randomFormula == 2) {
                text1.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
                a1Wrong1 = true;
                text2.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
                a2Wrong2 = true;
                text3.setText(level_1_data.formulas[randomElement].right);
                a3Correct = true;
            }
        
          if(instructionsLength < 20){
                  //Adjusting Instruction label Font Size
                  instructions.fontSize = 47;  
              }
              else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 42;
            }
    }
};