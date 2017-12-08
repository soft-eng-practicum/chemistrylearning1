var level5 = function(game){
    
};

var levelBackground;
var countDownLabel;
var scoreLabel;
var instructions;
var timerLevel5;
var startedLevel5 = false;
var counterLevel5 = 5;

var flask;
var guyTween;
var flaskTween;
var formulaTween;

var text1, text2, text3, text4;
var f1, f2, f3, f4;
var score;
var guy;
var anim;

var pause_label;
var choiceLabel;
var menu;
var resumeButton;
var quitButton;
var pauseW = 600;
var pauseH = 800;

var level_5_data;
var randomElement;
var randomFormula;
var correct;
var wrong;

var pausedCorrect = 150;
var isTimerPaused = false;
var checkMark;
var xMark1, xMark2, xMark3, xMark4;
var pos1 = false;
var pos2 = false;

var heart1;
var heart2;
var heart3;

var switchJSON;

var correctSound;
var wrongSound;
var shortBeep;
var longBeep;

level5.prototype = {  
   
    //Main Phaser Create Function
  	create: function() { 
        
        //Creating JSON 
        switchJSON = Math.floor(Math.random() * 5);
        
        if(switchJSON == 0){
            level_5_data = JSON.parse(this.game.cache.getText('level_5_JSON')); 
        }
        else if(switchJSON == 1){
            level_5_data = JSON.parse(this.game.cache.getText('level_5_JSON_series_2'));
        } 
        else if(switchJSON == 2){
            level_5_data = JSON.parse(this.game.cache.getText('level_5_JSON_series_3'));
        } 
        else if(switchJSON == 3){
            level_5_data = JSON.parse(this.game.cache.getText('level_5_JSON_series_4'));
        } 
        else if(switchJSON == 4){
            level_5_data = JSON.parse(this.game.cache.getText('level_5_JSON_series_5'));
        } 
        //Pauses the Game Title Music when Game starts
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();
        
        //Creates the Background Image
        levelBackground =  this.game.add.sprite(0,0,"level5Background");
        levelBackground.scale.setTo(.67, 1.1);
        
        //Creates the Countdown Label
        countDownLabel = this.game.add.text(this.game.world.centerX-60, 10, "", {font: "120px Courier", fill: "#ffffff"});
        
        //Creates the Instructions Label
        instructions = this.game.add.text(this.game.world.centerX-295, 130, "Press Under The Correct Flask", {font: "34px Courier", fill: "BLACK"});
        
        //Creates short and long beeps for countdown
        shortBeep = this.game.add.audio("shortBeep");
        shortBeep.volume = .1;
        
        longBeep = this.game.add.audio("longBeep");
        longBeep.volume = .1;
        
        //Creates random numbers to randomize answers to the questions
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 4);
    
        //Creates and starts the Game Clock timer, counting every second
	    timerLevel5 = this.game.time.create(false);
        timerLevel5.loop(1000, this.updateCounter, this);
        timerLevel5.start();
       
        //Setting the score to 0 in the event that the player skipped to this level
        if(score == null) {
            score = 0;
        }
        
        //Creates the Score Label
        scoreLabel = this.game.add.text(this.game.width-195, 30, "Score: ", {font: "30px Courier", fill: "Yellow"});
        
        //Declaring and setting text to Score
        scoreLabel.setText("Score: " + score);
        
        //Created the GUY
        guy = this.game.add.sprite(150,440,"guy");
        guy.frame = 0;
        guy.scale.setTo(1, 1);
        guy.smoothed = false;
        this.game.physics.enable(guy, Phaser.Physics.ARCADE);
        
        //Sets the Guy animations
        guy.animations.add("left", [7,6,5,4], 10, true);
        guy.animations.add("right", [0,1,2,3], 10, true);
        guy.animations.add("stop", [4], 10, true);   
        
        //Creates a Group of flasks
        flask = this.game.add.group();
        flask.scale.setTo(1, 1);
        flask.enableBody = true;
        flask.physicsBodyType = Phaser.Physics.ARCADE;
          
        //Created 4 flasks from Group
        f1 = flask.create(5, 200, "greenFlask"/*"redFlask"*/);

        f2 = flask.create(f1.x + 149, 200, "purpleFlask"); 

        f3 = flask.create(f2.x + 150, 200, "redFlask");
        
        f4 = flask.create(f3.x + 150, 200, "orangeFlask");
        
        
        //Sets styling for Answer Text on flask
        var style1 = { font: "35px Arial", fill: "BLACK", wordWrap: true, wordWrapWidth: f1.width, align: "center", backgroundColor: "" };
        
        var style2 = { font: "35px Arial", fill: "BLACK", wordWrap: true, wordWrapWidth: f2.width, align: "center", backgroundColor: "" };
        
        var style3 = { font: "35px Arial", fill: "BLACK", wordWrap: true, wordWrapWidth: f3.width, align: "center", backgroundColor: "" };
        
        var style4 = { font: "35px Arial", fill: "BLACK", wordWrap: true, wordWrapWidth: f4.width, align: "center", backgroundColor: "" };

        //Create Text1 on flask
        text1 = this.game.add.text(f1.x, f1.y, "", style1, flask);
        text1.anchor.set(0.35);
        
        //Positions Text1
        text1.x = Math.floor((f1.x + f1.width / 2) - 15);
        text1.y = Math.floor(f1.y + f1.height / 1.3);

        //Create Text2 on flask
        text2 = this.game.add.text(f2.x, f2.y, "", style2, flask);
        text2.anchor.set(0.35);
        
        //Positions Text2
        text2.x = Math.floor((f2.x + f2.width / 2) - 15);
        text2.y = Math.floor(f2.y + f2.height / 1.3);

        //Create Text3 on flask
        text3 = this.game.add.text(f3.x, f3.y, "", style3, flask);
        text3.anchor.set(0.35);

        //Positions Text3
        text3.x = Math.floor((f3.x + f3.width / 2) - 15);
        text3.y = Math.floor(f3.y + f3.height / 1.3);
        
        //Create Text4 on flask
        text4 = this.game.add.text(f4.x, f4.y, "", style4, flask);
        text4.anchor.set(0.35);

        //Positions Text4
        text4.x = Math.floor((f4.x + f4.width / 2) - 15);
        text4.y = Math.floor(f4.y + f4.height / 1.3);
        
        //Creates a Green circle 
        var greenCircle = this.game.add.graphics(0, 0);
        greenCircle.beginFill(0x44FF0D, 1);
        greenCircle.drawCircle(70, 740, 75);
        
        //Creates a Purple circle
        var purpleCircle = this.game.add.graphics(0, 0);
        purpleCircle.beginFill(0xCB5ED4, 1);
        purpleCircle.drawCircle(215, 740, 75);
        
        //Creates a Blue circle
       /* var blueCircle = this.game.add.graphics(0, 0);
        blueCircle.beginFill(0x2D11FF, 1);
        blueCircle.drawCircle(370, 740, 75);*/
        
        //Creates a Red circle
        var redCircle = this.game.add.graphics(0, 0);
        redCircle.beginFill(0xFF0000, 1);
        redCircle.drawCircle(370, 740, 75);
        
        //Creates a Orange circle
        var orangeCircle = this.game.add.graphics(0, 0);
        orangeCircle.beginFill(0xE88200, 1);
        orangeCircle.drawCircle(515, 740, 75);
        
        //Creates check marks for right answers
        checkMark = this.game.add.sprite(0, 0,"checkMark");
        checkMark.visible = false;
        checkMark.scale.setTo(0.7, 0.7);
        checkMark.anchor.set(-.25, .9);
        
        //Creates check marks for right answers
        xMark1 = this.game.add.sprite(f1.x, f1.y,"xMark");
        xMark1.visible = false;
        xMark1.scale.setTo(0.8, 0.8);
        
        xMark2 = this.game.add.sprite(f2.x, f2.y,"xMark");
        xMark2.visible = false;
        xMark2.scale.setTo(0.8, 0.8);
        
        xMark3 = this.game.add.sprite(f3.x, f3.y,"xMark");
        xMark3.visible = false;
        xMark3.scale.setTo(0.8, 0.8);

        
        //Creates Hearts for Lives 
        heart1 = this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY-320,"heart");

        heart2 = this.game.add.sprite(this.game.world.centerX+170, this.game.world.centerY-320,"heart");
        
        heart3 = this.game.add.sprite(this.game.world.centerX+220, this.game.world.centerY-320,"heart");
        
        //Creates audio
        correctSound = this.game.add.audio("correctSound");
        correctSound.volume = .1;
        
        wrongSound = this.game.add.audio("wrongSound");
        wrongSound.volume = .1;

        //Resets time and delay for formulas
        counterLevel5 = 5;
        isTimerPaused = false;
        correct = false;
        wrong = false;
        pos1 = false;
        pos2 = false;
        level_2_Transition = false;
        level_5_Transition = false;
                          
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
    
    
    /*Function: update()
    *
    *Main Phaser Update Function
    */
    update: function () {
        
        //Guy Movement Left and Right
        if (startedLevel5) {
                          
            if(this.game.input.activePointer.x < guy.x){
            guy.animations.play("left");

            this.game.input.onDown.add(this.moveSprite, this); 
            }

            else if(this.game.input.activePointer.x > guy.x){
            guy.animations.play("right");

            this.game.input.onDown.add(this.moveSprite, this); 
            }
        }

        //Sets score to Score label
        scoreLabel.setText("Score: " + score);
            
        //Applies overlap physics for Collision of Guy & flask
        this.game.physics.arcade.overlap(guy, flask, this.collisionHandlerFlask, null, this);

        //Retrieves data when game starts
        if(startedLevel5){
            this.handleData();   
        }
        
        //Deduct lives with each wrong answer
        if (lives == 2) {
            heart1.visible = false;
        }
        else if (lives == 1) {
            heart1.visible = false;
            heart2.visible = false;
        }
        else if (lives == 0) {            
            this.game.state.start("GameOver");
        }
        
        //Stopping score from being Negative
        if(score < 0){
            score = 0;
        }
    },
    
    
    /*Function: moveSprite()
    *
    *Moves Guy to pointer location when clicked
    */
    moveSprite: function(pointer) {
        
        var duration = (this.game.physics.arcade.distanceToPointer(guy, pointer) / 300) * 400; 

        guyTween = this.game.add.tween(guy).to({ x: pointer.x -50 }, duration, Phaser.Easing.Linear.None, true);
    },
    
    
    /*Function: collisionHandlerFlask()
    *
    *Guy and Flask Collision
    */
    collisionHandlerFlask: function(guy, flask) {
        guy.visible = false;
    },

    
    /*Function: render()
    *
    *Renders labels and colors in the level
    */
    render: function() {

        countDownLabel.setText(counterLevel5);
        
        //Chnages Count Down Label Red
        if (counterLevel5 <= 5) {
            countDownLabel.addColor("RED", 0);
        }
        else if (counterLevel5 > 5) {
            countDownLabel.addColor("#ffffff", 0);
        }        
    },  

    
    /*Function: updateCounter()
    *
    *Update Time Countdown (Game Timer)
    */
    updateCounter: function() {  
        //Counter starts at 5 for Countdown
        
        //Game Time not started 
        if (startedLevel5 == false) {
            counterLevel5--;
            shortBeep.play();
            
            if (counterLevel5 < 1) {
                shortBeep.pause();
                longBeep.play();
            }
            
            if (counterLevel5 <= 0) { 
                counterLevel5 = 7;
                startedLevel5 = true;
            }
        }
        //Game Time has started 
        else if (startedLevel5 == true) {
                counterLevel5--;
            
            //Tweens Flasks to shake
            if (counterLevel5 <= 5) {
                flaskTween = this.game.add.tween(flask).to({ x: 5}, 50, Phaser.Easing.Linear.None, true, 0, 0, true);
            }
        
            if (counterLevel5 < 1) {
              
                counterLevel5 = 0;
                timerLevel5.pause();
                isTimerPaused = true;
            }        
        }
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
          instructions.setText(level_5_data.chemical_formulas.formula1.name);
            
          if(level_5_data.chemical_formulas.formula1.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 40;
            }

            if (randomFormula == 0) { 
                text1.setText(level_5_data.chemical_formulas.formula1.right);
                text2.setText(level_5_data.chemical_formulas.formula1.wrong1);
                text3.setText(level_5_data.chemical_formulas.formula1.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula1.wrong3);
                                
                    if (counterLevel5 < 1) {
                    flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                        
                    flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                        
                    formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                    flaskTween.onComplete.add(function() {
                        if (guy.visible == true) {    
                            correct = true;
                            correctSound.play();
                            score = score + 50;
                        }                                    
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                        }, this);
                        counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                            }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark1.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) -  70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            
                        }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 1;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }     
                    
            }
            else if (randomFormula == 1) { 
                text1.setText(level_5_data.chemical_formulas.formula1.wrong3);
                text2.setText(level_5_data.chemical_formulas.formula1.right);
                text3.setText(level_5_data.chemical_formulas.formula1.wrong4);
                text4.setText(level_5_data.chemical_formulas.formula1.wrong5);
                                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() {
                     if (guy.visible == true) { 
                         correct = true;
                         correctSound.play();
                         score = score + 50;
                        } 
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                        }, this);
            
                            counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                            }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 1;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }

            }
            else if (randomFormula == 2) { 
                text1.setText(level_5_data.chemical_formulas.formula1.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula1.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula1.right);
                text4.setText(level_5_data.chemical_formulas.formula1.wrong1);
                                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                     if (guy.visible == true) {
                         correct = true;
                         correctSound.play();
                         score = score + 50;
                        } 
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                        }, this);
                   
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 1;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
                
            }
            else if (randomFormula == 3) { 
                text1.setText(level_5_data.chemical_formulas.formula1.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula1.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula1.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula1.right);
                                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                     if (guy.visible == true) {     
                         correct = true;
                         correctSound.play();
                         score = score + 50;
                        } 
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                        }, this);
                   
                 counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f3.x + f3.width / 2)- 70);
                                xMark3.y = Math.floor(f3.y + f3.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 1;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
                
            }
        }
        
/////////////////////////////////////////////////////////////////////////////////////////
        if (randomElement == 1) {
          instructions.setText(level_5_data.chemical_formulas.formula2.name);
            
          if(level_5_data.chemical_formulas.formula2.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 40;
            }

            if (randomFormula == 0) { 
                text1.setText(level_5_data.chemical_formulas.formula2.right);
                text2.setText(level_5_data.chemical_formulas.formula2.wrong1);
                text3.setText(level_5_data.chemical_formulas.formula2.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula2.wrong3);

                 if (counterLevel5 < 1) {
                    flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                    flaskTween.onComplete.add(function(){
                         if (guy.visible == true) {
                            correct = true;
                             correctSound.play();
                            score = score + 50;
                            }
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                        }, this);
                     
                   counterLevel5 = 7;
            
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark1.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 2;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
            }
            else if (randomFormula == 1) { 
                text1.setText(level_5_data.chemical_formulas.formula2.wrong3);
                text2.setText(level_5_data.chemical_formulas.formula2.right);
                text3.setText(level_5_data.chemical_formulas.formula2.wrong4);
                text4.setText(level_5_data.chemical_formulas.formula2.wrong5);
                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                
                flaskTween.onComplete.add(function() {
                     if (guy.visible == true) {
                         correct = true;
                         correctSound.play();
                         score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else{
                            lives=2;
                        }
                        }
                    }, this);
                    
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 2;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
            }
            else if (randomFormula == 2) { 
                text1.setText(level_5_data.chemical_formulas.formula2.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula2.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula2.right);
                text4.setText(level_5_data.chemical_formulas.formula2.wrong1);
                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                     if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                    }
                    }, this);
   
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 2;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
            }
            else if (randomFormula == 3) { 
                text1.setText(level_5_data.chemical_formulas.formula2.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula2.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula2.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula2.right);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                     if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                        }
                    }, this);
                
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark3.y = Math.floor(f3.y + f3.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 2;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        } 
            }
        }
        
//////////////////////////////////////////////////////////////////////////////////////////
        if (randomElement == 2) {
          instructions.setText(level_5_data.chemical_formulas.formula3.name);
            
          if(level_5_data.chemical_formulas.formula3.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 40;
            }

            if (randomFormula == 0) { 
                text1.setText(level_5_data.chemical_formulas.formula3.right);
                text2.setText(level_5_data.chemical_formulas.formula3.wrong1);
                text3.setText(level_5_data.chemical_formulas.formula3.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula3.wrong3);
                
                 if (counterLevel5 < 1) {
                    flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                    flaskTween.onComplete.add(function() {
                        if (guy.visible == true) {
                           correct = true;
                           correctSound.play();
                           score = score + 50;
                         }
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives = 1;
                            }
                            else if (lives == 1) {
                                lives = 0;
                            }
                            else {
                                lives = 2;
                            }
                        }
                        }, this);
                    
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark1.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 3;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if (randomFormula == 1) { 
                text1.setText(level_5_data.chemical_formulas.formula3.wrong3);
                text2.setText(level_5_data.chemical_formulas.formula3.right);
                text3.setText(level_5_data.chemical_formulas.formula3.wrong4);
                text4.setText(level_5_data.chemical_formulas.formula3.wrong5);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                
                flaskTween.onComplete.add(function(){
                    if(guy.visible == true){
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    }
                    else{
                        wrong = true;
                        wrongSound.play();
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
                        }
                    }, this);
          
                counterLevel5 = 7;
                        }
                
                        if(isTimerPaused){
                            pausedCorrect--;
                            
                            if(correct){
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                }
                            else if(wrong){ 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3); 
                            }
                            }
                        
                        if(pausedCorrect < 1){
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 3;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if(randomFormula == 2){ 
                text1.setText(level_5_data.chemical_formulas.formula3.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula3.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula3.right);
                text4.setText(level_5_data.chemical_formulas.formula3.wrong1);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function(){ 
                    if(guy.visible == true){
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    } 
                    else{
                        wrong = true;
                        wrongSound.play();
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
                    }
                    }, this);
                    
                counterLevel5 = 7;
                        }
                
                        if(isTimerPaused){
                            pausedCorrect--;
                            
                            if(correct){
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                }
                            else if(wrong){ 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if(pausedCorrect < 1){
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 3;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if(randomFormula == 3){ 
                text1.setText(level_5_data.chemical_formulas.formula3.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula3.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula3.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula3.right);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function(){ 
                    if(guy.visible == true){
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    } 
                    else{
                        wrong = true;
                        wrongSound.play();
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
                        }
                    }, this);
                    
                  counterLevel5 = 7;
                        }
                
                        if(isTimerPaused){
                            pausedCorrect--;
                            
                            if(correct){
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                }
                            else if(wrong){ 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark3.y = Math.floor(f3.y + f3.height / 3);
                            }
                            }
                        
                        if(pausedCorrect < 1){
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 3;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
        }
 
////////////////////////////////////////////////////////////////////////////////////////      
        if(randomElement == 3){
          instructions.setText(level_5_data.chemical_formulas.formula4.name);
            
          if(level_5_data.chemical_formulas.formula4.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 40;
            }

            if(randomFormula == 0){ 
                text1.setText(level_5_data.chemical_formulas.formula4.right);
                text2.setText(level_5_data.chemical_formulas.formula4.wrong1);
                text3.setText(level_5_data.chemical_formulas.formula4.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula4.wrong3);
                
                 if(counterLevel5 < 1){
                    flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                    flaskTween.onComplete.add(function(){
                        if(guy.visible == true){
                            correct = true;
                            correctSound.play();
                            score = score + 50;
                         }
                        else{
                            wrong = true;
                            wrongSound.play();
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
                        }
                        }, this);
                        
                     counterLevel5 = 7;
                        }
                
                        if(isTimerPaused){
                            pausedCorrect--;
                            
                            if(correct){
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                }
                            else if(wrong){ 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark1.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if(pausedCorrect < 1){
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 4;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if(randomFormula == 1){ 
                text1.setText(level_5_data.chemical_formulas.formula4.wrong3);
                text2.setText(level_5_data.chemical_formulas.formula4.right);
                text3.setText(level_5_data.chemical_formulas.formula4.wrong4);
                text4.setText(level_5_data.chemical_formulas.formula4.wrong5);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                
                flaskTween.onComplete.add(function() {
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    } 
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                        }
                    }, this);
    
                  counterLevel5 = 7;
                }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                        }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 4;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if (randomFormula == 2) { 
                text1.setText(level_5_data.chemical_formulas.formula4.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula4.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula4.right);
                text4.setText(level_5_data.chemical_formulas.formula4.wrong1);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                        score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives = 1;
                        }
                        else if (lives == 1) {
                            lives = 0;
                        }
                        else {
                            lives = 2;
                        }
                    }
                    }, this);
               
                  counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 4;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
            else if (randomFormula == 3) { 
                text1.setText(level_5_data.chemical_formulas.formula4.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula4.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula4.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula4.right);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function(){ 
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                         score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                    }
                    }, this);
               
                  counterLevel5 = 7;
                        }
                
                        if(isTimerPaused){
                            pausedCorrect--;
                            
                            if(correct){
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                }
                            else if(wrong){ 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark3.y = Math.floor(f3.y + f3.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomFormula = Math.floor(Math.random() * 4);
                            randomElement = 4;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            correct = false;
                            wrong = false;
                        }
            }
        }
 
//////////////////////////////////////////////////////////////////////////////////////        
        if (randomElement == 4) {
          instructions.setText(level_5_data.chemical_formulas.formula5.name);
            
          if(level_5_data.chemical_formulas.formula5.name.length < 20){
            
                //Adjusting Instruction label Font Size
                instructions.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                instructions.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                instructions.fontSize = 40;
            }

            if (randomFormula == 0) { 
                text1.setText(level_5_data.chemical_formulas.formula5.right);
                text2.setText(level_5_data.chemical_formulas.formula5.wrong1);
                text3.setText(level_5_data.chemical_formulas.formula5.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula5.wrong3);
                
                 if (counterLevel5 < 1) {
                    flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                    formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                     
                    formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                    flaskTween.onComplete.add(function() {
                        if (guy.visible == true) {
                            correct = true;
                            correctSound.play();
                            score = score + 50;
                         }
                        else {
                            wrong = true;
                            wrongSound.play();
                            score = score - 50;
                            if (lives == 2) {
                                lives=1;
                            }
                            else if (lives == 1) {
                                lives=0;
                            }
                            else {
                                lives=2;
                            }
                        }
                    }, this);
                
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f1.x + f1.width / 2) - 50);
                                checkMark.y = Math.floor(f1.y + f1.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark1.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            
                            if(correct){
                                this.game.state.start("Winner");
                            }
                            else{
                                correct = false;
                                wrong = false;
                                randomFormula = Math.floor(Math.random() * 4);
                                randomElement = 4;//Math.floor(Math.random() * 4);
                            }
                        }
            }
            else if (randomFormula == 1) { 
                text1.setText(level_5_data.chemical_formulas.formula5.wrong3);
                text2.setText(level_5_data.chemical_formulas.formula5.right);
                text3.setText(level_5_data.chemical_formulas.formula5.wrong4);
                text4.setText(level_5_data.chemical_formulas.formula5.wrong5);
                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                
                flaskTween.onComplete.add(function() {
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                         score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                        }
                    }, this);
             
                  counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f2.x + f2.width / 2) - 50);
                                checkMark.y = Math.floor(f2.y + f2.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark2.y = Math.floor(f3.y + f3.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomElement = 0;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            
                            if(correct){
                                this.game.state.start("Winner");
                            }
                            else{
                                correct = false;
                                wrong = false;
                                randomFormula = Math.floor(Math.random() * 4);
                                randomElement = 4;//Math.floor(Math.random() * 4);
                            }
                        }
            }
            else if (randomFormula == 2) { 
                text1.setText(level_5_data.chemical_formulas.formula5.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula5.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula5.right);
                text4.setText(level_5_data.chemical_formulas.formula5.wrong1);
                
                if (counterLevel5 < 1) {
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f4).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text4).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                         score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives=1;
                        }
                        else if (lives == 1) {
                            lives=0;
                        }
                        else {
                            lives=2;
                        }
                    }
                    }, this);
                
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f3.x + f3.width / 2) - 50);
                                checkMark.y = Math.floor(f3.y + f3.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f4.x + f4.width / 2) - 70);
                                xMark3.y = Math.floor(f4.y + f4.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomElement = 0;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            
                            if(correct){
                                this.game.state.start("Winner");
                            }
                            else{
                                correct = false;
                                wrong = false;
                                randomFormula = Math.floor(Math.random() * 4);
                                randomElement = 4;//Math.floor(Math.random() * 4);
                            }
                        }
            }
            else if (randomFormula == 3) { 
                text1.setText(level_5_data.chemical_formulas.formula5.wrong5);
                text2.setText(level_5_data.chemical_formulas.formula5.wrong6);
                text3.setText(level_5_data.chemical_formulas.formula5.wrong2);
                text4.setText(level_5_data.chemical_formulas.formula5.right);
                
                if(counterLevel5 < 1){
                flaskTween = this.game.add.tween(f1).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f2).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                flaskTween = this.game.add.tween(f3).to({ y: 500}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text1).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text2).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);
                    
                formulaTween = this.game.add.tween(text3).to({ y: 600}, 250, Phaser.Easing.Linear.None, true, 0, 0, true);

                flaskTween.onComplete.add(function() { 
                    if (guy.visible == true) {
                        correct = true;
                        correctSound.play();
                         score = score + 50;
                    }
                    else {
                        wrong = true;
                        wrongSound.play();
                        score = score - 50;
                        if (lives == 2) {
                            lives = 1;
                        }
                        else if (lives == 1) {
                            lives = 0;
                        }
                        else {
                            lives=2;
                        }
                    }
                    }, this);
                
                    counterLevel5 = 7;
                        }
                
                        if (isTimerPaused) {
                            pausedCorrect--;
                            
                            if (correct) {
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                }
                            else if (wrong) { 
                                checkMark.visible = true;
                                checkMark.x = Math.floor((f4.x + f4.width / 2) - 50);
                                checkMark.y = Math.floor(f4.y + f4.height / 1.6);
                                
                                xMark1.visible = true;
                                xMark1.x = Math.floor((f1.x + f1.width / 2) - 70);
                                xMark1.y = Math.floor(f1.y + f1.height / 3);
                                
                                xMark2.visible = true;
                                xMark2.x = Math.floor((f2.x + f2.width / 2) - 70);
                                xMark2.y = Math.floor(f2.y + f2.height / 3);
                                
                                xMark3.visible = true;
                                xMark3.x = Math.floor((f3.x + f3.width / 2) - 70);
                                xMark3.y = Math.floor(f3.y + f3.height / 3);
                            }
                            }
                        
                        if (pausedCorrect < 1) {
                            randomElement = 0;
                            timerLevel5.resume();
                            checkMark.visible = false;
                            xMark1.visible = false;
                            xMark2.visible = false;
                            xMark3.visible = false;
                            isTimerPaused = false;
                            pausedCorrect = 150;
                            guy.visible = true;
                            
                            if(correct){
                                this.game.state.start("Winner");
                            }
                            else{
                                correct = false;
                                wrong = false;
                                randomFormula = Math.floor(Math.random() * 4);
                                randomElement = 4;//Math.floor(Math.random() * 4);
                            }
                        }
                }
        }
    }
};