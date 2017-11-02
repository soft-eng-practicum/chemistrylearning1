var level3 = function(game){
    
};

//Create the variable for the background
var background; 
var instructions;
var countDownLabel

//Create variable for group of spiders
var spiders;
var spidersSpeed;

//Create variables for individual spiders

var spider1;
var spider2;
var spider3;

//Create variables for spider labels
var spiderText1;
var spiderText2;
var spiderText3;

//Create variable for score text to display

var scoreText;

//Create variable to display chemical formula name

var displayChemicalFormula;

// Create random variables for the formulas and the name

var  currentRound;
var  randomFormula;

var correctAnswer;
var wrongAnswer;
var emitter;

//Create variable that counts down 

var countDownLabel;

//Create variable for timer

var gameTimer;

//Create boolean for the start of the game

var gameStart = false;

//Create variable to contain counter value

var counterLevel3 = 5;
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
    create: function() {
        //Parse the text back to a JSON object
        level_3_data = JSON.parse(this.game.cache.getText('level_3_JSON')); 
        
        //Pause main theme music
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();
        
        //Creates the Background Image
        background = this.game.add.sprite(0,0,'Nebula2');
        background.scale.setTo(.83,1.12);
        
        //Creates the label for the countdown
        countDownLabel = this.game.add.text(this.game.world.centerX-60,10, "", {font: "120px Courier", fill: "#ffffff"});
        
        //Creates the Instructions Label
        instructions = this.game.add.text(this.game.world.centerX-290, 130, "Choose The Correct Spider", {font: "34px Courier", fill: "#ffffff"});
        
        //Creates the timer for the game 
        gameTimer = this.game.time.create(false);
        gameTimer.loop(1000, this.updateCounter, this);
        gameTimer.start();
        
        //Creates the hearts for the lives
        heart1 = this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY-320, 'heart');
        heart2 = this.game.add.sprite(this.game.world.centerX+170, this.game.world.centerY-320, 'heart');
        heart3 = this.game.add.sprite(this.game.world.centerX+220, this.game.world.centerY-320, 'heart');
        
        correctSound = this.game.add.audio('correctSound');
        correctSound.volume = 0.1;
        
        incorrectSound = this.game.add.audio('wrongSound');
        incorrectSound.volume = 0.1;
        
        //Initializing display chemical formula to a value
        displayChemicalFormula = (this.game.world.centerX-290, 130, "Select The Correct Spider", {font: "37px Courier", fill: "White"});
         
        //Assign value to the beep variables
        
        shortBeep = this.game.add.audio('shortBeep');
        shortBeep.volume = 0.1;
        longBeep = this.game.add.audio('longBeep');
        longBeep.volume = 0.1;
        
        //skipping spike part lines 138-139
        //it's just setting the image at the bottom
        
        //Setting current round to zero  
        currentRound = 0;
        
        //Assign value to the random variable
        randomFormula = Math.floor(Math.random() * 3);

        //Setting the score to zero in the event that a player skipped to this level
        if(score == null) {
            score = 0;
        }
        
        //Assign score a value and display score text
        scoreText = this.game.add.text(this.game.width-195, 30, "", {font: "30px Courier", fill: "Yellow"});
        scoreText.setText("Score: " + score);

        //Create a group of spiders
        spiders = this.game.add.group();
        spiders.enableBody = true;
        spiders.physicsBodyType = Phaser.Physics.ARCADE;
        spiders.inputEnabled = true;
        
        //Create the individual spiders
        spider1 = this.game.add.sprite(200, game.world.height - 600, 'Garden spider');
        spider1.scale.setTo(.2, .2);
        
        spider2 = this.game.add.sprite(400, game.world.height - 400, 'Garden spider1');
        spider2.scale.setTo(.2, .2);
        
        spider3 = this.game.add.sprite(150, game.world.height - 200, 'Garden spider2');
        spider3.scale.setTo(.2, .2); 
            
        
        //Clicking spiders input actions on the group of spiders
        //spiders.inputEnableChildren = true;
        

        //Set spider speed
        spidersSpeed = 0.7317;
        
        //Create group for spider labels
        spiderLabels = this.game.add.group();
        spiderLabels.enableBody = true;
        spiderLabels.physicsBodyType = Phaser.Physics.ARCADE;

       
       
    //Set the SCALE_FOR_ANSER_SPIDER to default doesn't seem to be needed so I commented it out for now as well as the other scales
       // spider1.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        // Create variable to hold the font style 
        var style1 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: spider1.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        //Create a text label and add it to the spiderLabels group
        spiderText1 = this.game.add.text(Math.floor(spider1.x + spider1.width/2), Math.floor(spider1.y + spider1.height/2), "", style1, spiderLabels);
        
        spiderText1.anchor.set(0.5);
       // spiderText1.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        //Create a text label and add it to the spiderLabels group
        spider2 = spiders.create(spider1.x + 200, -50,  'Garden spider 1');
       
       //This also doesn't seem needed for now so I'm commenting it out too
       // spider2.events.onInputDown.add(selectedSpider, this);
       // spider2.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        var style2 = { font: "50px Arial", fill: "Yellow", wordWrap:true, wordWrapWidth: spider2.width, align: "center", backgroundColor: "rgba(0,0,0,0)"};
        
        spiderText2 = this.game.add.text(Math.floor(spider2.x + spider2.width/2), Math.floor(spider2.y + spider2.height/2), "", style2, spiderLabels);
        spiderText2.anchor.set(0.5);
       // spiderText2.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        //Create a text label and add to spiderLabels group
        spider3 = spiders.create(spider2.x + 200, -50, 'garden spider3');
       // spider3.events.onInputDown.add(selectedSpider, this);
       // spider3.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        var style3 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: spider3.width, align: "center", backgroundColor: "rgba(0,0,0,0)"};
        
        spiderText3 = this.game.add.text(Math.floor(spider3.x + spider3.width/2), Math.floor(spider3.y + spider3.height/2), "", style3, spiderLabels);
        spiderText3.anchor.set(0.5);
        //spiderText3.scale.setTo(SCALE_FOR_ANSWER_SPIDER, SCALE_FOR_ANSWER_SPIDER);
        
        //Set spiders not visible
        spiders.visible = false;
        
        checkMark = this.game.add.sprite(0, 0, "checkMark");
        checkMark.visible = false;
        checkMark.scale.setTo(0.6, 0.6);
        
        xMark = this.game.add.sprite(0,0, "xMark");
        xMark.visible = false;
        xMark.scale.setTo(0.8, 0.8);
        
        pauseLabel = this.game.add.sprite(30,30, "Pause_Button");
        pauseLabel.scale.setTo(1,1);
        pauseLabel.inputEnabled = true;
        
        pauseLabel.events.onInputUp.add(function(){
            //Game is paused when pause button is pressed
            this.game.paused = true;
            
            pauseBackground = this.game.add.sprite(0,0, "NebulaWeb");
            pauseBackground.scale.setTo(0.6, 0.8);
            
            //Creates the pause menu picture. I stop at 261 line 
            menu = this.game.add.sprite(pauseW/2 + 135, pauseH/2 + 90, "menu");
            menu.anchor.setTo(1,1);
        });


    // An input listener that returns from being paused
    //this.game.input.onDown.add(unpause, self);

    /*Function: unpause(event)
    *
    *Handles the functions in the pause menu
    */
    function upause(event) {
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
                    this.game.paused = false;
                    pauseBackground.visible = false;
                    menu.destroy();
                }
            }
          }
        
        counterLevel3 = 5;
        isStarted = false;
        pauseDelay = 150;
        correct = false;
        wrong = false;
        firstToGo = true;
        level3Transition = false;
        level5Transition = true;
    };
    
    },
    
    //This function will create the pause screen

    
    //This will resume the game and unpause it
    playTheGame: function() {
        
    },
    
    //This function will be what runs the game. It will be the function that runs every second. Other functions will not run every second unless called on in the update function
    update: function() {
        
    },
    
    //This function will be to destroy a spider
    breakSpider: function() {
        
    },
    
    //This will determine if a spider was selected on a collision of some sort. In this case, the pointer. Reference level 2's collisonHandler for bubbles
    collisionHandlerSpider: function(selectedSpider) {
        
    },
    
    //This function will be the timer for the level
    countDownText: function() {
        
    },
    
    //This function should reset the timer for the level
    updateCounter: function() {
        
    },
    
    //This function should choose a question from the json file. Use level one's setQuestion for reference, the array is the same for the level_3_data.json already
    setQuestion: function() {
        
    }
}

    