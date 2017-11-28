var level3 = function (game) {

};

//Create the variable for the background
var background;
var pauseBackground;
var instructions;
var countDownLabel
var countDown = 5;

//Create variable for group of spiders
var spiders;
var spidersSpeed;

//Create variables for individual spiders
var spider1;
var spider2;
var spider3;

//Create variables for the group of flies and the individual flies
var flies;
var fly1;
var fly2;
var fly3;

//Create variables for the text of the Flies
var fly1Text;
var fly2Text;
var fly3Text;

//Create variable for score text to display
var scoreText;
var score;

// Create random variables for the formulas and the name
var currentRound;
var randomFormula;
var randomElement;

//Create variable for timer
var gameTimer;

//Create boolean for the start of the game
var started = false;

//Create variable to hold heart image
var heart1;
var heart2;
var heart3;

//Create variables for the lives
var lives;

//Create variables for the level audio
var shortBeep;
var longBeep;
var music;
var levelMusic;
var correctSound;
var incorrectSound;

var pauseDelay = 150;

//Create the variables for the answer selections(check marks and x marks)
var checkMark;
var xMark;

//Create the booleans for the correct or wrong answer
var correct = false;
var wrong = false;

var firstToGo = true;

//A variable to track the length of "instructions" text
var instructionsLength;

//A variable to set a random first wrong answer
var randomWrong1;

//A variable to set a random second wrong answer
var randomWrong2;


//Create function that runs one time
level3.prototype = {

    //This function will initiate all the variables. Also important for initilizing the graphics and audio
    create: function () {
        //Parse the text back to a JSON object
        level_3_data = JSON.parse(this.game.cache.getText('level_3_JSON'));

        //Pause main theme music
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();

        //Creates the Background Image
        background = this.game.add.sprite(0, 0, 'NebulaWeb');
        background.scale.setTo(.83, 1.12);

        //Creates the label for the countdown
        countDownLabel = this.game.add.text(this.game.world.centerX - 60, 10, "", {
            font: "120px Courier",
            fill: "#ffffff"
        });

        //Creates the timer for the game 
        gameTimer = this.game.time.create(false);
        gameTimer.loop(1000, this.updateCounter, this);
        gameTimer.start();

        //Creates the Instructions Label
        instructions = this.game.add.text(this.game.world.centerX - 240, 130, "Choose The Correct Fly", {
            font: "34px Courier",
            fill: "#ffffff"
        });

        //Creates the hearts for the lives
        heart1 = this.game.add.sprite(this.game.world.centerX + 120, this.game.world.centerY - 320, 'heart');
        heart2 = this.game.add.sprite(this.game.world.centerX + 170, this.game.world.centerY - 320, 'heart');
        heart3 = this.game.add.sprite(this.game.world.centerX + 220, this.game.world.centerY - 320, 'heart');

        correctSound = this.game.add.audio('correctSound');
        correctSound.volume = 0.1;

        incorrectSound = this.game.add.audio('wrongSound');
        incorrectSound.volume = 0.1;

        //Assign value to the beep variables
        shortBeep = this.game.add.audio('shortBeep');
        shortBeep.volume = 0.1;

        longBeep = this.game.add.audio('longBeep');
        longBeep.volume = 0.1;

        //Setting current round to zero  
        currentRound = 0;

        //Assign value to the random variable
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);

        //Setting the score to zero in the event that a player skipped to this level
        if (score == null) {
            score = 0;
        }

        //Assign score a value and display score text
        scoreText = this.game.add.text(this.game.width - 195, 30, "", {
            font: "30px Courier",
            fill: "Yellow"
        });
        scoreText.setText("Score: " + score);

        //Create a group of spiders
        spiders = this.game.add.group();
        spiders.enableBody = true;
        spiders.physicsBodyType = Phaser.Physics.ARCADE;
        spiders.inputEnableChildren = true;

        //Set the speed for the spiders
        spidersSpeed = 0.68;

        //Create the individual Spiders
        spider1 = spiders.create(game.world.width - 610, game.world.height - 800, 'spider');
        spider1.scale.setTo(.60, .60);

        spider2 = spiders.create(game.world.width - 390, game.world.height - 800, 'spider1');
        spider2.scale.setTo(.60, .60);

        spider3 = spiders.create(game.world.width - 175, game.world.height - 800, 'spider2');
        spider3.scale.setTo(.60, .60);

        //Set spiders not visible
        spiders.visible = false;

        //Create a group of flies
        flies = this.game.add.group();
        flies.inputEnableChildren = true;
        flies.enableBody = true;
        flies.physicsBodyType = Phaser.Physics.ARCADE;

        //Create the individual flies
        fly1 = flies.create(this.game.world.width - 590, this.game.world.height - 100, 'fly1');
        fly1.scale.setTo(.60, .60);
        fly1.events.onInputDown.add(this.collisionHandlerFly, this);

        fly2 = flies.create(this.game.world.width - 370, this.game.world.height - 100, 'fly2');
        fly2.scale.setTo(.60, .60);
        fly2.events.onInputDown.add(this.collisionHandlerFly, this);

        fly3 = flies.create(this.game.world.width - 160, this.game.world.height - 100, 'fly3');
        fly3.scale.setTo(.60, .60);
        fly3.events.onInputDown.add(this.collisionHandlerFly, this);

        //Create the text style for the answer choices on the flies.
        var style = {
            font: "37px Arial",
            fill: "Yellow",
            wordWrap: true,
            wordWrapWidth: fly1.width,
            align: "center",
            backgroundColor: ""
        };

        //Create the text for the answer choices on the flies.
        fly1Text = this.game.add.text(fly1.x + 70, fly1.y, "", style, flies);
        fly1Text.anchor.set(.75);

        fly2Text = this.game.add.text(fly2.x + 70, fly2.y, "", style, flies);
        fly2Text.anchor.set(.75);

        fly3Text = this.game.add.text(fly3.x + 75, fly3.y, "", style, flies);
        fly3Text.anchor.set(.75);

        //Create the checkmarks for the correct answers
        checkMark = this.game.add.sprite(0, 0, "checkMark");
        checkMark.visible = false;
        checkMark.scale.setTo(0.6, 0.6);

        //Create the X for the incorrect answers
        xMark = this.game.add.sprite(0, 0, "xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);

        var pauseLabel = this.game.add.sprite(30, 30, "Pause_Button");
        pauseLabel.scale.setTo(1, 1);
        pauseLabel.inputEnabled = true;

        pauseLabel.events.onInputUp.add(function () {
            //Game is paused when pause button is pressed
            this.game.paused = true;

            var pauseBackground = this.game.add.sprite(0, 0, "space_background");
            pauseBackground.scale.setTo(0.6, 0.8);

            //Creates the pause menu picture. I stop at 261 line 
            var menu = this.game.add.sprite(pauseW / 2 + 135, pauseH / 2 + 90, "menu");
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
                var x1 = pauseW / 2 - 270 / 2,
                    x2 = pauseW / 2 + 270 / 2,
                    y1 = pauseH / 2 - 180 / 2,
                    y2 = pauseH / 2 + 180 / 2;

                //Check if the click was inside the menu
                if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                    var choiceMap = ['Resume', 'Resume', 'Resume', 'Quit', 'Quit', 'Quit'];

                    var x = event.x - x1;
                    var y = event.y - y1;

                    var choice = Math.floor(x / 90) + 3 * Math.floor(y / 90);

                    if (choiceMap[choice] == "Quit") {
                        this.game.paused = false;
                        this.game.state.start("GameOver");
                    }
                    if (choiceMap[choice] == "Resume") {
                        this.game.paused = false;
                        pauseBackground.visible = false;
                        menu.destroy();
                    }
                }
            }
        };

        countDown = 5;
        started = false;
        pauseDelay = 150;
        correct = false;
        wrong = false;
        firstToGo = true;
        level_3_Transition = false;
        level_4_Transition = true;

    },

    //This will resume the game and unpause it
    playTheGame: function () {

        resumeButton.destroy();
        this.game.paused = false;
    },

    //This function will be what runs the game. It will be the function that runs every second. Other functions will not run every second unless called on in the update function
    update: function () {

        //Controll the speed of the spiders
        spiders.y += spidersSpeed;

        //Set the text of the score
        scoreText.setText("Score: " + score);


        //Appies overlap physics for collision of spiders and flies
        this.game.physics.arcade.overlap(spiders, flies, this.breakSpider, null, this);

        if (started) {
            if (firstToGo) {
                this.setQuestion();
                firstToGo = false;
            }
            spiders.visible = true;

            //If the answer is correct, show the checkmark and stop the spiders.
            if (correct == true) {
                pauseDelay--;
                gameTimer.pause();

                if (fly1.visible == false) {
                    checkMark.x = fly1.x;
                    checkMark.y = fly1.y;
                    checkMark.visible = true;
                    fly1.visible = true;
                    spidersSpeed = 0;
                } else if (fly2.visible == false) {
                    checkMark.x = fly2.x;
                    checkMark.y = fly2.y;
                    checkMark.visible = true;
                    fly2.visible = true;
                    spidersSpeed = 0;
                } else if (fly3.visible == false) {
                    checkMark.x = fly3.x;
                    checkMark.y = fly3.y;
                    checkMark.visible = true;
                    fly3.visible = true;
                    spidersSpeed = 0;
                }

                if (pauseDelay < 1) {
                    checkMark.visible = false;
                    correct = false;
                    pauseDelay = 150;
                    spidersSpeed = 0.7317;
                    countDown = 7;
                    gameTimer.resume();
                    this.setQuestion();

                    if (currentRound > 4) {
                        this.game.state.start('Transition');
                    }
                }
            }

            //If the answer is incorrect, show the x mark
            if (wrong == true) {
                pauseDelay = pauseDelay - 10;

                if (fly1.visible == false) {
                    xMark.x = fly1.x;
                    xMark.y += fly1.y;
                    xMark.visible = true;
                    fly1.visible = true;

                } else if (fly2.visible == false) {
                    xMark.x = fly2.x;
                    xMark.y += fly2.y;
                    xMark.visible = true;
                    fly2.visible = true;

                } else if (fly3.visible == false) {
                    xMark.x = fly3.x;
                    xMark.y = fly3.y;
                    xMark.visible = true;
                    fly3.visible = true;
                }

                if (pauseDelay < 1) {
                    xMark.visible = false;
                    xMark.y = flies.y;
                    wrong = false;
                    pauseDelay = 150;
                }
            }
        }

        //Stopping score from being Negative
        if (score < 0) {
            score = 0;
        }

        //Deduct lives with each wrong answer
        if (lives == 2) {
            heart1.visible = false;
        } else if (lives == 1) {
            heart2.visible = false;
        } else if (lives == 0) {
            this.game.state.start("GameOver");
        }
    },

    shake: function () {

        //  Make the camera shake to appear as if the flies are making the web shake. 
        game.camera.shake(0.01, 50);

    },

    //This function will be the timer for the level
    render: function () {
        //Set the count
        countDownLabel.setText(countDown);

        //Changes Count Down Label Red
        if (countDown <= 5) {
            countDownLabel.addColor("RED", 0);
        } else if (countDown > 5) {
            countDownLabel.addColor("#ffffff", 0);
        }
    },

    //This function should reset the timer for the level
    updateCounter: function () {

        //Game Time not started 
        if (started == false) {
            countDown--;
            shortBeep.play();

            if (countDown < 1) {
                shortBeep.pause();
                longBeep.play();
            }

            if (countDown <= 0) {
                countDown = 7;
                started = true;
            }
        }

        //Game Time has started 
        else if (started == true) {
            countDown--;

            //Add a tween for the flies to shake
            if (countDown <= 10) {
                //this.shake();
                //fliesTween = this.game.add.tween(flies).to({
                //x: 5
                //}, 20, Phaser.Easing.Linear.None, true, 0, 0, true);
            }

            if (countDown < 1) {
                incorrectSound.play();

                lives--;
                countDown = 7;
            }
        }
    },

    //This function will be to destroy a spider
    breakSpider: function () {

        spiders.y = spiders.height + 10;
    },

    //This will determine if a fly was selected on a collision of some sort. In this case, the pointer. Reference level 2's collisonHandler for bubbles
    collisionHandlerFly: function (selectedFly) {

        /*Stops user from clicking when the check is displayed
      IMPORTANT!!!!*/
        if (correct == false) {
            if (selectedFly == fly1) {
                fly1.visible = false;
                this.correctFly(fly1Text.text);
            }
            if (selectedFly == fly2) {
                fly2.visible = false;
                this.correctFly(fly2Text.text);
            }
            if (selectedFly == fly3) {
                fly3.visible = false;
                this.correctFly(fly3Text.text);
            }
        }
    },

    correctFly: function (selectedFlyText) {
        if (selectedFlyText == level_3_data.formulas[randomElement].right) {
            // Increase score by 50 
            score += 50;

            //Increase the round
            currentRound++;

            // Reset the postion of the spiders by calling the breakSpider function
            this.breakSpider();

            // Reset the counter to 8
            countDown = 7;

            // Play sound for correct answer
            correctSound.play();

            //Set the correct boolean to true to trigger update for corect answer(see update function).
            correct = true;

        }

        if (selectedFlyText == level_3_data.formulas[randomElement].wrong[randomWrong1] || selectedFlyText == level_3_data.formulas[randomElement].wrong[randomWrong2]) {
            // Decrease score by 50
            score -= 50;

            // Play sound for wrong answer
            incorrectSound.play();

            // Decrease lives by one
            lives--;

            //Set the wrong boolean to true to trigger update for wrong answer(see update function)
            wrong = true;
        }
    },


    //This function should choose a question from the json file. Use level one's setQuestion for reference, the array is the same for the level_3_data.json already
    setQuestion: function () {
        randomElement = Math.floor(Math.random() * 14);
        console.log("The random Element is: " + randomElement);

        randomFormula = Math.floor(Math.random() * 3);

        //Setting the random wrong answer 1
        randomWrong1 = Math.floor(Math.random() * 4);
        //Setting the random wrong answer 2
        randomWrong2 = Math.floor(Math.random() * 4);
        //Making sure the two wrong answer aren't matching
        while (randomWrong1 == randomWrong2) {
            randomWrong2 = Math.floor(Math.random() * 4);
        }
        //Adjusting Instruction label color 
        instructions.addColor("Yellow", 0);
        instructions.anchor.setTo(-0.1, 0.2);

        console.log(level_3_data);
        //Resetting all my correct/wrong booleans to false

        //Choosing the formula
        instructions.setText(level_3_data.formulas[randomElement].formulaName);
        instructionsLength = instructions.length;

        if (randomFormula == 0) {
            fly1Text.setText(level_3_data.formulas[randomElement].right);
            fly2Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            fly3Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
        }
        if (randomFormula == 1) {
            fly1Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            fly2Text.setText(level_3_data.formulas[randomElement].right);
            fly3Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
        }
        if (randomFormula == 2) {
            fly1Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            fly2Text.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
            fly3Text.setText(level_3_data.formulas[randomElement].right);
        }

        if (instructionsLength < 20) {
            //Adjusting Instruction label Font Size
            instructions.fontSize = 47;
        } else {
            //Adjusting Instruction label for Chemical Names
            instructions.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            instructions.fontSize = 42;
        }
    }

};