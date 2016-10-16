var level1 = function(game){
    
};

var levelBackground;
var countDownLabel;
var scoreLabel;
var instructions;
var timer;
var cursors;

var moveTimer;
var moveCount = 0;
var isUp = false;
var isDown = true;
var counter = 99;
var delay = 115;

var asteroid;
var asteroidTween;
var bullets;
var bulletTime = 0;
var fireButton;
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

var phaserJSON;
var randomElement;
var randomFormula;
var correct;
var wrong;

level1.prototype = {  
   
    //Main Phaser Create Function
  	create: function(){ 
        
        //Creating JSON 
        phaserJSON = JSON.parse(this.game.cache.getText("chemicalFormula")); 
        
        //Background Image
        levelBackground =  this.game.add.sprite(0,0,"level1Background");
		//levelBackground.anchor.setTo(0.2, 0.2);
        levelBackground.scale.setTo(.24, 0.67);
        
        //Countdown Label
        countDownLabel = this.game.add.text(150, 10, "", {font: "80px Courier", fill: "#ffffff"});
        
        //Instructions Label
        //Or Destroy ALL incorrect Asteroids **Debating**
        instructions = this.game.add.text(15, 140, "Destroy The Correct Asteroid", {font: "20px Courier", fill: "#ffffff"});
        
        //Creates random numbers to start different questions and answers
        randomElement = 0;//Math.floor(Math.random() * 3);
        randomFormula = Math.floor(Math.random() * 3);
    
        //Game Clock timer
	    timer = this.game.time.create(false);
        timer.loop(1000, this.updateCounter, this);
        timer.start();
       
        //Score Label
        scoreLabel = this.game.add.text(250, 30, "Score: ", {font: "20px Courier", fill: "Yellow"});
        
        //Declaring Score
        score = 0;
        scoreLabel.setText("Score: " + score);
        
        //Spacecraft created
        this.spaceCraft = this.game.add.sprite(-10,200,"spaceCraft");
		//this.spaceCraft.anchor.setTo(0.5, 0.5);
        this.spaceCraft.scale.setTo(0.2, 0.3);
        this.game.physics.enable(this.spaceCraft, Phaser.Physics.ARCADE);
        
        //Space ship move timer
        moveTimer = this.game.time.create(false);
        moveTimer.loop(1, this.updateMove, this);
        moveTimer.start();
        
        //Creating a Group of Asteroids
        asteroid = this.game.add.group();
        asteroid.enableBody = true;
        asteroid.physicsBodyType = Phaser.Physics.ARCADE;
        asteroid.inputEnabled = true;
            
        //Created 3 Asteroids from Group
        a1 = asteroid.create(280, 200, "asteroid"); 

        a2 = asteroid.create(280, 380, "asteroid"); 

        a3 = asteroid.create(280, 560, "asteroid"); 

        //Sets styling for Answer Text on Asteroids
        var style = { font: "25px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a1.width, align: "center", backgroundColor: "" };
        
        var style = { font: "25px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a2.width, align: "center", backgroundColor: "" };
        
        var style = { font: "25px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: a3.width, align: "center", backgroundColor: "" };

        //Create Text1 on Asteroids
        text1 = this.game.add.text(a1.x, a1.y, "", style, asteroid);
        text1.anchor.set(0.35);
        
        //Positions Text1
        text1.x = Math.floor((a1.x + a1.width / 2) - 5);
        text1.y = Math.floor(a1.y + a1.height / 2);

        //Create Text2 on Asteroids
        text2 = this.game.add.text(a2.x, a2.y, "", style, asteroid);
        text2.anchor.set(0.35);
        
        //Positions Text2
        text2.x = Math.floor((a2.x + a2.width / 2) - 5);
        text2.y = Math.floor(a2.y + a2.height / 2);

        //Create Text3 on Asteroids
        text3 = this.game.add.text(a3.x, a3.y, "", style, asteroid);
        text3.anchor.set(0.35);

        //Positions Text3
        text3.x = Math.floor((a3.x + a3.width / 2) - 5);
        text3.y = Math.floor(a3.y + a3.height / 2);

        //Movement of Asteroid
        // asteroidTween = this.game.add.tween(asteroid).to({x:-600}, 13500, Phaser.Easing.Linear.None, true, 2000, 10, false);
        
        //Creates Bullets Group
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, "bullet");
        bullets.setAll("anchor.x", -0.2);
        bullets.setAll("anchor.y", -1.5);
        bullets.setAll("outOfBoundsKill", true);
        bullets.setAll("checkWorldBounds", true);
        
        //Fires bullet when Spacebar is pressed
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        cursors = this.input.keyboard.createCursorKeys();
          
        //Code for the pause menu

        //Create a pause label to use as a button
        pause_label = this.game.add.text(pauseW, 40, "PAUSE", { font: '20px Arial', fill: 'RED' });
        pause_label.inputEnabled = true;

        pause_label.events.onInputUp.add(function() {
            //When the pause button is pressed, the game is paused
            this.game.paused = true;

            //Creates the pause menu
            menu = this.game.add.sprite(pauseW, pauseH, "background");
            menu.anchor.setTo(0.1, 0.5);
            menu.scale.setTo(0.5, 0.75);

            //A Choice label to illustrate which menu item was chosen.
            choiceLabel = this.game.add.text(this.game.world.centerX, pauseH-300, 'Click to continue', { font: '50px Arial', fill: '#fff' });
            choiceLabel.anchor.setTo(0.5, 0.5);

            //Resume Button
            resumeButton = this.game.add.button(400,600,"play",this.playTheGame,this);
            resumeButton.anchor.setTo(0.5,1.7);
            resumeButton.scale.setTo(1.8, 1.8);

            //Quit Button
            quitButton = this.game.add.button(400,600,"play",this.playTheGame,this);
            quitButton.anchor.setTo(0.5,0.3);
            quitButton.scale.setTo(1.8, 1.8);
        });

    // An input listener that returns from being paused
    this.game.input.onDown.add(unpause, self);

    // Method that handles the pause menu
    function unpause(event){
        // Only act if paused
        if(this.game.paused){
          
            menu.destroy();
            choiceLabel.destroy();
            resumeButton.destroy();
            quitButton.destroy();

            // Unpause the game
            this.game.paused = false;
            }
        };
    },
    
   /* playTheGame: function(){
        menu.destroy();
        choiceLabel.destroy();
        resumeButton.destroy();
        quitButton.destroy();
        
        this.game.paused = false;
        
    },*/

    //Main Phaser Update Function
    update: function () {
        
        //Spacecraft Movement Up and Down
        if(isDown) {
            this.spaceCraft.y += moveCount;

            if(this.spaceCraft.y >= (window.innerHeight *   window.devicePixelRatio) - 60) {
                isDown = false;
                isUp = true;  
            }
        }

        if(isUp) {
            this.spaceCraft.y -= moveCount;

            if(this.spaceCraft.y <= 160) {
                isUp = false;
                isDown = true;
            }
        }

        //Controls the delay in speed of the Spacecraft
        if(moveCount > 1) {
            moveCount = 0;
        }

        //Fires weapon
        if (fireButton.isDown) {
            this.fireBullet();
        }
        
         scoreLabel.setText("Score: " + score);
        
        //Applies overlap physics for Collision of Bullets & Asteroids
        this.game.physics.arcade.overlap(bullets, asteroid, this.collisionHandlerBullet, null, this);
        
        //Applies overlap physics for Collision of Spacecraft & Asteroids
        this.game.physics.arcade.overlap(this.spaceCraft, asteroid, this.collisionHandlerSpaceCraft, null, this);

        //Delay for respawn of formulas
        delay--;

        if(delay == 0) {
            this.handleData();
            delay = 10;   
        }
    },
    
    //Fire Bullet function
    fireBullet: function() {

        if (this.game.time.now > bulletTime) {

                bullet = bullets.getFirstExists(false);

            if (bullet) {
                // Location from where the bullet is being fired
                bullet.reset(this.spaceCraft.x + 85, this.spaceCraft.y);
                // Set the y component of velocity
                bullet.body.velocity.x = 400;
                // Set the time between the bullets to the current time + 200
                bulletTime = this.game.time.now + 250;
             }
         }
    },
        
    //Bullet and Asteroid Collision Function
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
    
    //SpaceCraft and Asteroid Collision Function
    collisionHandlerSpaceCraft: function(spaceCraft, asteroid) {
        spaceCraft.kill();
    },

    
    //Render Game Function
    render: function() {

        countDownLabel.setText(counter);
        
        //Chnages Count Down Label Red
        if(counter == 5) {
            countDownLabel.addColor("RED", 0);
        }
    },  

    //Update Time Countdown 
    updateCounter: function() {            
        counter--;
        
        //Time Expired
        if(counter < 0) { 
            counter = 12;
            timer.stop();
           // moveTimer.stop();
           // this.game.state.start("GameTitle");
        }
    },
    
    //Update Spacecraft Movement
    updateMove: function() {            
        //Increment number for spacecraft speed
        moveCount += 5; 
    }, 
    
    //HandleData Function to Decide Right & Wrong Answers
    handleData: function() {
               
        if(randomElement == 0){

          instructions.setText(phaserJSON.easy.formula1.name);

            if(randomFormula == 0){ 
                text1.setText(phaserJSON.easy.formula1.right);
                text2.setText(phaserJSON.easy.formula1.wrong1);
                text3.setText(phaserJSON.easy.formula1.wrong2);

                 if(a1.visible == false) {
                     correct = true; 
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 1;
                    }
                if(a2.visible == false) {
                     wrong = true;
                    }
                if(a3.visible == false) {
                     wrong = true;
                    }
            }
            else if(randomFormula == 1){ 
                text1.setText(phaserJSON.easy.formula1.wrong3);
                text2.setText(phaserJSON.easy.formula1.right);
                text3.setText(phaserJSON.easy.formula1.wrong4);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                    correct = true;
                     score = score + 50;
                    text2.visible = true;
                    a2.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 1;
                    
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 2){ 
                text1.setText(phaserJSON.easy.formula1.wrong5);
                text2.setText(phaserJSON.easy.formula1.wrong6);
                text3.setText(phaserJSON.easy.formula1.right);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    text3.visible = true;
                    a3.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 1;
                }
            }
        }
        
/////////////////////////////////////////////////////////////////////////////////////////
        if(randomElement == 1){
          instructions.setText(phaserJSON.easy.formula2.name);

            if(randomFormula == 0){ 
                text1.setText(phaserJSON.easy.formula2.right);
                text2.setText(phaserJSON.easy.formula2.wrong1);
                text3.setText(phaserJSON.easy.formula2.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 2;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 1){ 
                text1.setText(phaserJSON.easy.formula2.wrong3);
                text2.setText(phaserJSON.easy.formula2.right);
                text3.setText(phaserJSON.easy.formula2.wrong4);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 2;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 2){ 
                text1.setText(phaserJSON.easy.formula2.wrong5);
                text2.setText(phaserJSON.easy.formula2.wrong6);
                text3.setText(phaserJSON.easy.formula2.right);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 2;
                }
            }
        }
        
//////////////////////////////////////////////////////////////////////////////////////////
        if(randomElement == 2){
          instructions.setText(phaserJSON.easy.formula3.name);

            if(randomFormula == 0){ 
                text1.setText(phaserJSON.easy.formula3.right);
                text2.setText(phaserJSON.easy.formula3.wrong1);
                text3.setText(phaserJSON.easy.formula3.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score = score + 50;
                     a1.visible = true;
                     text1.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 3;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 1){ 
                text1.setText(phaserJSON.easy.formula3.wrong3);
                text2.setText(phaserJSON.easy.formula3.right);
                text3.setText(phaserJSON.easy.formula3.wrong4);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 3;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 2){ 
                text1.setText(phaserJSON.easy.formula3.wrong5);
                text2.setText(phaserJSON.easy.formula3.wrong6);
                text3.setText(phaserJSON.easy.formula3.right);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 3;
                }
            }
        }
 
////////////////////////////////////////////////////////////////////////////////////////      
        if(randomElement == 3){
          instructions.setText(phaserJSON.easy.formula4.name);

            if(randomFormula == 0){ 
                text1.setText(phaserJSON.easy.formula4.right);
                text2.setText(phaserJSON.easy.formula4.wrong1);
                text3.setText(phaserJSON.easy.formula4.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                     score =+ 50;
                     a1.visible = true;
                     text1.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 4;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 1){ 
                text1.setText(phaserJSON.easy.formula4.wrong3);
                text2.setText(phaserJSON.easy.formula4.right);
                text3.setText(phaserJSON.easy.formula4.wrong4);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 4;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 2){ 
                text1.setText(phaserJSON.easy.formula4.wrong5);
                text2.setText(phaserJSON.easy.formula4.wrong6);
                text3.setText(phaserJSON.easy.formula4.right);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 4;
                }
            }
        }
 
//////////////////////////////////////////////////////////////////////////////////////        
        if(randomElement == 4){
          instructions.setText(phaserJSON.easy.formula5.name);

            if(randomFormula == 0){ 
                text1.setText(phaserJSON.easy.formula5.right);
                text2.setText(phaserJSON.easy.formula5.wrong1);
                text3.setText(phaserJSON.easy.formula5.wrong2);

                 if(a1.visible == false) {
                     correct = true;
                    score = score + 50;
                    a1.visible = true;
                    text1.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    this.game.state.start("Level2");
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 1){ 
                text1.setText(phaserJSON.easy.formula5.wrong3);
                text2.setText(phaserJSON.easy.formula5.right);
                text3.setText(phaserJSON.easy.formula5.wrong4);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                    correct = true;
                    score = score + 50;
                    a2.visible = true;
                    text2.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    this.game.state.start("Level2");
                }
                if(a3.visible == false) {
                     wrong = true;
                }
            }
            else if(randomFormula == 2){ 
                text1.setText(phaserJSON.easy.formula5.wrong5);
                text2.setText(phaserJSON.easy.formula5.wrong6);
                text3.setText(phaserJSON.easy.formula5.right);

                if(a1.visible == false) {
                     wrong = true;
                }
                if(a2.visible == false) {
                     wrong = true;
                }
                if(a3.visible == false) {
                    correct = true;
                    score = score + 50;
                    a3.visible = true;
                    text3.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    this.game.state.start("Level2");
                }
            }
        }

        //Adjusting Instruction label for Chemical Names 
        instructions.anchor.setTo(-0.1, 0);
        instructions.addColor("Yellow", 0);
        instructions.fontSize = 30;   
    }
};