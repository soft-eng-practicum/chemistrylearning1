var level3 = function (game) {

};

//Create the variable for the background
var background;
var instructions;
var countDownLabel
var countDown = 5;

//Create variable for group of spiders
var spiders;
var spidersSpeed;
var moveCount;
var moveCount = 0;

//Create variables for individual spiders

var spider1;
var spider2;
var spider3;

var flies;
var fly1;
var fly2;
var fly3;

//Create variables for spider labels
var spiderText1;
var spiderText2;
var spiderText3;

//Create variable for score text to display

var scoreText;

//Create variable to display chemical formula name

var displayChemicalFormula;

// Create random variables for the formulas and the name

var currentRound;
var randomFormula;

var correctAnswer;
var wrongAnswer;
var emitter;

//Create variable for timer

var gameTimer;

//Create boolean for the start of the game

var gameStart = false;

//Create variable to hold heart image
var heart1;
var heart2;
var heart3;

var shortBeep;
var longBeep;

var correctSound;
var incorrectSound;

var pauseDelay = 150;

var checkMark;
var xMark;

var correct = false;
var wrong = false;

var firstToGo = true;

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

        //Creates the Instructions Label
        instructions = this.game.add.text(this.game.world.centerX - 290, 130, "Choose The Correct Spider", {
            font: "34px Courier",
            fill: "#ffffff"
        });

        //Creates the timer for the game 
        gameTimer = this.game.time.create(false);
        gameTimer.loop(1000, this.updateCounter, this);
        gameTimer.start();

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
        spidersSpeed = 0.7317;

        //Create the text labels for the spider group
        spiderLabels = this.game.add.group();
        spiderLabels.enableBody = true;
        spiderLabels.physicsBodyType = Phaser.Physics.ARCADE;

        //***********I recommend making the spiders bigger so the text can fit**********
        //Create attributes for Spider1
        spider1 = spiders.create(game.world.width - 610, game.world.height - 500, 'spider');
        //spider1.event.onInputDown.add(selectedSpider, this);
        spider1.scale.setTo(.60, .60);

        spider2 = spiders.create(game.world.width - 390, game.world.height - 500, 'spider1');
        // spider2.event.onInputDown.add(selectedSpider, this);
        spider2.scale.setTo(.60, .60);

        spider3 = spiders.create(game.world.width - 175, game.world.height - 500, 'spider2');
        // spider3.event.onInputDown.add(selectedSpider, this);
        spider3.scale.setTo(.60, .60);


        var style1 = {
            font: "50px Arial",
            fill: "Yellow",
            wordWrap: true,
            wordWrapWidth: spider1.width,
            align: "center",
            backgroundColor: "rgba(0,0,0,0)"
        };

        //spiderText1 = this.game.add.text(Math.floor(spider1.x + spider1.width/2), Math.floor(spider1.y + spider1.height/2), "", style1, spiderLabels);
        //spiderText1.anchor.set(0.5);
        //spiderText1.scale.setTo(.5, .5);



        //Set spiders not visible
        //spiders.visible = false;    

        //Create a group of flies
        flies = this.game.add.group();
        flies.enableBody = true;
        flies.physicsBodyType = Phaser.Physics.ARCADE;
        flies.inputEnableChildren = true;

        //Create the individual flies
        fly1 = flies.create(game.world.width - 590, game.world.height - 150, 'fly1', flies);
        fly1.scale.setTo(.60, .60);

        fly2 = flies.create(game.world.width - 370, game.world.height - 150, 'fly2', flies);
        fly2.scale.setTo(.60, .60);

        fly3 = flies.create(game.world.width - 160, game.world.height - 150, 'fly3', flies);
        fly3.scale.setTo(.60, .60);


        checkMark = this.game.add.sprite(0, 0, "checkMark");
        checkMark.visible = false;
        checkMark.scale.setTo(0.6, 0.6);

        xMark = this.game.add.sprite(0, 0, "xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);

        pauseLabel = this.game.add.sprite(30, 30, "Pause_Button");
        pauseLabel.scale.setTo(1, 1);
        pauseLabel.inputEnabled = true;

        pauseLabel.events.onInputUp.add(function () {
            //Game is paused when pause button is pressed
            this.game.paused = true;

            pauseBackground = this.game.add.sprite(0, 0, "space_background");
            pauseBackground.scale.setTo(0.6, 0.8);

            //Creates the pause menu picture. I stop at 261 line 
            menu = this.game.add.sprite(pauseW / 2 + 135, pauseH / 2 + 90, "menu");
            menu.anchor.setTo(1, 1);
        });


        // An input listener that returns from being paused
        this.game.input.onDown.add(unpause, self);

        /*Function: unpause(event)
         *
         *Handles the functions in the pause menu
         */
        function unpause(event) {
            
        };

        countDown = 5;
        isStarted = false;
        pauseDelay = 150;
        correct = false;
        wrong = false;
        firstToGo = true;
        level3Transition = false;
        level5Transition = true;

    },


    //This will resume the game and unpause it
    playTheGame: function () {
       
    },

    //This function will be what runs the game. It will be the function that runs every second. Other functions will not run every second unless called on in the update function
    update: function () {

        spiders.y += spidersSpeed;
        spiderLabels.y += spidersSpeed;
        checkMark.y += spidersSpeed;
        xMark.y += spidersSpeed;


    },

    //This function will be to destroy a spider
    breakSpider: function () {



    },
    
    //This function will determine if the spiders have hit the flies
    spiderEatFly: function()

    //This will determine if a spider was selected on a collision of some sort. In this case, the pointer. Reference level 2's collisonHandler for bubbles
    collisionHandlerSpider: function (selectedSpider) {

    },

    //This function will be the timer for the level
    countDownText: function () {

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
                countDown = 10;
                started = true;
                this.setQuestion();
            }
        }

        //Game Time has started 
        else if (started == true) {
            countDown--;

            if (countDown < 1) {
                wrongSound.play();

                lives--;
                countDown = 10;
            }
        }
    },




    //This function should choose a question from the json file. Use level one's setQuestion for reference, the array is the same for the level_3_data.json already
    setQuestion: function () {
        randomElement = Math.floor(Math.random() * 20);
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
        //*********************These shouldn't be asteriods****************************************
        a1Correct = false;
        a1Wrong1 = false;
        a2Correct = false;
        a2Wrong1 = false;
        a2Wrong2 = false;
        a3Correct = false;
        a3Wrong2 = false;

        //Choosing the formula
        instructions.setText(level_3_data.formulas[randomElement].formulaName);
        instructionsLength = instructions.length;

        if (randomFormula == 0) {
            text1.setText(level_3_data.formulas[randomElement].right);
            a1Correct = true;
            text2.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            a2Wrong1 = true;
            text3.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
            a3Wrong2 = true;
        }
        if (randomFormula == 1) {
            text1.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            a1Wrong1 = true;
            text2.setText(level_3_data.formulas[randomElement].right);
            a2Correct = true;
            text3.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
            a3Wrong2 = true;
        }
        if (randomFormula == 2) {
            text1.setText(level_3_data.formulas[randomElement].wrong[randomWrong1]);
            a1Wrong1 = true;
            text2.setText(level_3_data.formulas[randomElement].wrong[randomWrong2]);
            a2Wrong2 = true;
            text3.setText(level_3_data.formulas[randomElement].right);
            a3Correct = true;
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