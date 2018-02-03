var level2 = function (game) {
    
};

// Create background variable
var background;

// Create varibale for group of bubbles
var bubbles;
var bubbles_velocity;

// Creat a variable for background bubbles
var background_bubbles;

// Create variables for the individual bubbles
var bubble_01, bubble_02, bubble_03;

// Create variables for bubble labels
var bubble_text_01, bubble_text_02, bubble_text_03;

// Create varibale for spikes and group of spikes
var spikes;
var spike_group;
var spike_set_01, spike_set_02, spike_set_03, spike_set_04;

// Create variable for score text display
var score_text;

// Create a variable to display chemical formula name
var chemical_formula_text_display;

// Ceate a variable to hold the data for the formulas
var level_2_data;

// Create random variables for the formulas and the name
var current_round, randomFormula;

var SCALE_FOR_ANSWER_BUBBLE = 0.62;

var correct_answer, wrong_answer;

var emitter;

// Ceate count down label to start game
var count_down_label;

// Create timer varibale
var game_timer;

// Create boolen for game being in a started state
var is_started = false;

// Create variable to hold counter value
var counter_level_2 = 5;

// Create variable to hold heart image
var heart_1, heart_2, heart_3;

var short_beep;
var long_beep;

var correct_sound;
var incorrect_sound;

var pause_delay = 150;

var check_mark;
var x_mark;

var correct = false;
var wrong  = false;

var first_go = true;

//This is to determine if the player has answered enough questions to proceed to the next level
correctCount = 0;

//A set of booleans to determine if a bubble is correct or not. I admit, I used the b1, b2, b3 naming convention so the code I copied would only need to be tweaked a little
var b1Correct;
var b1Wrong1;
var b2Correct;
var b2Wrong1;
var b2Wrong2;
var b3Correct;
var b3Wrong2;

// Create an array of the main functions of the game 
level2.prototype = {

    // Create funion runs one time only
    create: function () {
        
        // Parse the text back to a JSON object
        level_2_data = JSON.parse(this.game.cache.getText('level_2_JSON'));
        
        background = this.game.add.sprite(0, 0,'level_2_background_image');
        background.scale.setTo(.27,.51);
    
        count_down_label = this.game.add.text(this.game.world.centerX-60, 10, "", {font: "120px Courier", fill: "#ffffff"});
        
        game_timer = this.game.time.create(false);
        game_timer.loop(1000, updateCounter, this);
        game_timer.start();
        
        heart_1 = this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY-320, 'heart');
        heart_2 = this.game.add.sprite(this.game.world.centerX+170, this.game.world.centerY-320, 'heart');
        heart_3 = this.game.add.sprite(this.game.world.centerX+220, this.game.world.centerY-320, 'heart');
   
        correct_sound = this.game.add.audio('correctSound');
        correct_sound.volume = 0.1;
        
        incorrect_sound = this.game.add.audio('wrongSound');
        incorrect_sound.volume = 0.1;
        
        // Asign the chemical name text display a value
        // Display basic game instructions first
        chemical_formula_text_display = this.game.add.text(this.game.world.centerX-290, 130, "Select The Correct Bubble", {font: "37px Courier", fill: "White"});
      
        // Pause the main theme music
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();
        
        // Assign value to the beep variables
        short_beep = this.game.add.audio('shortBeep');
        short_beep.volume = 0.1;
        
        long_beep = this.game.add.audio('longBeep');
        long_beep.volume = 0.1;
    
        // Add spike image and set visible to false
        // Image is only used for size attributes it is not displayed in the game
        spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 250, 'spike_image');
        spikes.visible = false;
    
        // Set current round to zero
        current_round = 0;
       
        // Assign value to the random variable
        randomFormula = Math.floor(Math.random() * 3);
        
        //In the case that the player skips to this level, the score is going to be 0
        if(score == null) {
            score = 0;
        }
        
        
        // Assign score a value and the score text display
        score_text = this.game.add.text(this.game.width-195, 30, "", {font: "30px Courier", fill: "Yellow"});
        score_text.setText("Score: " + score);
        
        // Create group of bubbles
        bubbles = this.game.add.group();
       
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        bubbles.inputEnableChildren = true;
        bubbles.enableBody = true;
        bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Set bubbles_velocity
        bubbles_velocity = 0.7317;
        
        // Create group for bubble labels
        bubble_labels = this.game.add.group();
        bubble_labels.enableBody = true;
        bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected and add them to the bubbles group
        bubble_01 = bubbles.create(this.game.width/30, -50, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        bubble_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create variable to hold the font style
        var style_01 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        // Create a text label and add it to the bubble_labels group
        bubble_text_01 = this.game.add.text(Math.floor(bubble_01.x + bubble_01.width/2), Math.floor(bubble_01.y + bubble_01.height/2), "", style_01, bubble_labels);
        
        bubble_text_01.anchor.set(0.5);
        bubble_text_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Create a text label and add it to the bubble_labels group
        bubble_02 = bubbles.create(bubble_01.x + 200, -50, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
        bubble_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_02 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        bubble_text_02 = this.game.add.text(Math.floor(bubble_02.x + bubble_02.width/2), Math.floor(bubble_02.y + bubble_02.height/2), "", style_02, bubble_labels);
        bubble_text_02.anchor.set(0.5);
        bubble_text_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create a text label and add it to the bubble_labels group
        bubble_03 = bubbles.create(bubble_02.x + 200, -50, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
        bubble_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_03 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        bubble_text_03 = this.game.add.text(Math.floor(bubble_03.x + bubble_03.width/2), Math.floor(bubble_03.y + bubble_03.height/2), "", style_03, bubble_labels);
        bubble_text_03.anchor.set(0.5);
        bubble_text_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Set bubbles not visible 
        bubbles.visible = false;
        
        check_mark = this.game.add.sprite(0, 0,"checkMark");
        check_mark.visible = false;
        check_mark.scale.setTo(0.6, 0.6);
        
        x_mark = this.game.add.sprite(0, 0,"xMark");
        x_mark.visible = false;
        x_mark.scale.setTo(0.8, 0.8);
                     
        // Create a group of spike sets
        spike_group = this.game.add.group();
        spike_group.enableBody = true;
        
        spike_set_01 = spike_group.create(0, height - spikes.height, 'spike_image', spike_group);
        spike_set_02 = spike_group.create(spike_set_01.x + 300, height - spikes.height, 'spike_image', spike_group);
        spike_set_03 = spike_group.create(spike_set_02.x + 300, height - spikes.height, 'spike_image', spike_group);
        spike_set_04 = spike_group.create(spike_set_03.x + 300, height - spikes.height, 'spike_image', spike_group);
        
        
        //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        emitter = this.game.add.emitter(this.game.world.centerX, 200, 200);

        //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        emitter.width = this.game.width - 50;

        emitter.makeParticles('emitter_bubble_image');

        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 400);

        emitter.setRotation(0, 0);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 0.5, 1, 1);
        emitter.gravity = -200;

        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 5000, 100);
        
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
                    this.game.paused = false;
                    pauseBackground.visible = false;
                    menu.destroy();
                }
            }
          }
        };
        
        counter_level_2 = 5;
        is_started = false;
        pause_delay = 150;
        correct = false;
        wrong = false;
        first_go = true;
        level_2_Transition = false;
        level_3_Transition = true;

    },

    // Function holds information for things that move 24fps 
    update: function () {
        
        bubbles.y += bubbles_velocity;
        bubble_labels.y += bubbles_velocity;
        check_mark.y += bubbles_velocity;
        x_mark.y += bubbles_velocity;
        
        // Set whats happens when bubbles hit spikes
        this.game.physics.arcade.overlap(bubbles, spike_group, bubbleHitSpike, null, this);
       
        score_text.setText("Score: " + score);
      
       if (is_started) {
           if (first_go) {
                setQuestion();
                first_go = false;
           }
           bubbles.visible = true;
           
           if (correct == true) {
               pause_delay--;
               game_timer.pause();
               
               if(bubble_01.visible == false) {
                    check_mark.x = bubble_01.x + 70;
                    check_mark.y = bubble_01.y + 170;
                    check_mark.visible = true;
                    x_mark.y = bubble_01.y + 200;
                    bubble_01.visible = true;
                    bubbles_velocity = 0;
                }
                else if (bubble_02.visible == false) {
                    check_mark.x = bubble_02.x + 70;
                    check_mark.y = bubble_02.y + 170;
                    check_mark.visible = true;
                    x_mark.y = bubble_02.y + 200;
                    bubble_02.visible = true;
                    bubbles_velocity = 0;
                }
                else if (bubble_03.visible == false) {
                    check_mark.x = bubble_03.x + 70;
                    check_mark.y = bubble_03.y + 170;
                    check_mark.visible = true;
                    x_mark.y = bubble_03.y + 200;
                    bubble_03.visible = true;
                    bubbles_velocity = 0;
                }
               
                if (pause_delay < 1) {
                    check_mark.visible = false;
                    correct = false;
                    pause_delay = 150;
                    bubbles_velocity = 0.7317;
                    counter_level_2 = 8;
                    game_timer.resume();
                  
                    if(correctCount < 5){
                        setQuestion();
                    }
                    else if (correctCount >= 5) {
                        this.game.state.start('Transition');
                    } 
               }
             }
           
           if (wrong == true) {
               pause_delay = pause_delay - 10;
               
               if(bubble_01.visible == false){
                    x_mark.x = bubble_01.x + 30;
                    x_mark.y += bubbles_velocity;
                    x_mark.visible = true;
                    bubble_01.visible = true;
                }
                else if (bubble_02.visible == false){
                    x_mark.x = bubble_02.x + 30;
                    x_mark.y += bubbles_velocity;
                    x_mark.visible = true;
                    bubble_02.visible = true;
                }
                else if(bubble_03.visible == false){
                    x_mark.x = bubble_03.x + 30;
                    x_mark.y += bubbles_velocity;
                    x_mark.visible = true;
                    bubble_03.visible = true;
                }
               
                if(pause_delay < 1){
                    x_mark.visible = false;
                    x_mark.y = bubbles.y;
                    wrong = false;
                    pause_delay = 150;
               }
             }
           }

        // Handle hearts and lives 
        if (lives == 2) {
            
            heart_1.visible = false;
        } else if (lives == 1) {
           
            heart_1.visible = false;
            heart_2.visible = false;
        
        } else if (lives == 0) {
            
            this.game.state.start('GameOver');
        }
        
        // Score cannot go to a negative value
        if (score < 0) {
            score = 0;
        }
    },
    
    // Function holds information for things that move 50fps
    render: function () {
        count_down_label.setText(counter_level_2);
        
          //Chnages Count Down Label Red
        if (counter_level_2 <= 5) {
            count_down_label.addColor("RED", 0);
        }
        else if (counter_level_2 > 5) {
            count_down_label.addColor("#ffffff", 0);
        } 
    } 
};

function updateCounter() {  
        
    //Game Time not started 
    if(is_started == false) {
        counter_level_2--;
        short_beep.play();
            
        if(counter_level_2 < 1){
            short_beep.pause();
            long_beep.play();
        }
            
        if(counter_level_2 <= 0) { 
            counter_level_2 = 8;
            is_started = true;
        }
    }
        //Game Time has started 
    else if(is_started == true) {
        counter_level_2--;
        
        if (counter_level_2 < 1) {
            
            incorrect_sound.play();
            
            lives--;
            counter_level_2 = 0;
        }
    }
// Closes method
}

// Collision handler for bubbles and spikes
function bubbleHitSpike(input_bubble) {
  //  input_bubble.visible = false;
  //  bubble_labels.visible = false;
    bubbles.y = bubble_01.height + 55;
    bubble_labels.y = bubble_01.height + 55;
}

// Collision handler for selected bubble
function selectedBubble(input_bubble) {

    /*Stops user from clicking when the check is displayed
      IMPORTANT!!!!*/
    if(correct == false){
        if (input_bubble === bubble_01) { 
            bubble_01.visible = false;
            checkIfSelectedBubbleIsCorrect(bubble_text_01.text);
            } 

        if (input_bubble === bubble_02) {
            bubble_02.visible = false;
            checkIfSelectedBubbleIsCorrect(bubble_text_02.text);    
        } 

        if (input_bubble === bubble_03) { 
            bubble_03.visible = false;
            checkIfSelectedBubbleIsCorrect(bubble_text_03.text);
        }
    }
}

/* Function holds the functionality for what happens
    when the user gets the answer correct 
*/
function stuffThatHappensWhenAnswerIsCorrect() {
   
    // Increase score by 50 
    score += 50;
    
    /* 
        Check to see if it is the last round,
        if it is then advance to the next
        level
    */ 
    current_round++;
    
    // Changes the data values 
    randomFormula = Math.floor(Math.random() * 3);
    
    // Reset the postion of the bubble group
    resetBubblesPosition();
    
    // Reset the velocity of the bubbles
   // bubbles_velocity = 0.7;
    
    // Reset the counter to 8
    counter_level_2 = 8;
        // is_correct = true;
       // game_timer.pause();
    // Play sound for correct answer
    correct_sound.play();
    
    correct = true;

}

/* Function holds the functionality for what happens
    when the user gets the answer wrong 
*/
function stuffThatHappensWhenAnswerIsWrong() {
    
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
 
}

function checkIfSelectedBubbleIsCorrect(input_bubble_text) {
    
    // Condition for what happens if user gets formula 1 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.right) {

        stuffThatHappensWhenAnswerIsCorrect();
    } 

    
    // Condition for what happens if user gets formula 1 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong7 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 2 right
	if (input_bubble_text === level_2_data.chemical_formulas.formula2.right) {
        
        stuffThatHappensWhenAnswerIsCorrect();
    }
    
    // Condition for what happens if user gets formula 2 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula2.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong7 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong8 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong9 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 3 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.right) {
        
        stuffThatHappensWhenAnswerIsCorrect();
    }
    
    // Condition for what happens if user gets formula 3 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong6 ) {
       
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 4 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula4.right) {
   
        stuffThatHappensWhenAnswerIsCorrect();
    } 
    
     // Condition for what happens if user gets formula 4 wrong
    if (input_bubble_text ===  level_2_data.chemical_formulas.formula4.wrong1  ||      
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong2  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong3  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong4  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong5  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong6  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong7  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong8  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong9  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong10 ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong11 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
     // Condition for what happens if user gets formula 5 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula5.right) {

        stuffThatHappensWhenAnswerIsCorrect();
    }
    
     // Condition for what happens if user gets formula 5 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula5.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong7 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong8 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
   
    console.log("This is the value passed to checkIfSelectedBubbleIsCorrect(): " + input_bubble_text);
      
}

// Function will reset the y position of the bubbles
function resetBubblesPosition() {
    bubbles.y =  bubble_01.height + 55;
    bubble_labels.y = bubble_01.height + 55;
}

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
    b1Correct = false;
    b1Wrong1 = false;
    b2Correct = false;
    b2Wrong1 = false;
    b2Wrong2 = false;
    b3Correct = false;
    b3Wrong2 = false;
        
    //Choosing the formula
    instructions.setText(level_1_data.formulas[randomElement].formulaName);
    instructionsLength = instructions.length;
    if(randomFormula == 0){
        text1.setText(level_1_data.formulas[randomElement].right);
        b1Correct = true;
        text2.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
        b2Wrong1 = true;
        text3.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
        b3Wrong2 = true;
    }
    if(randomFormula == 1) {
        text1.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
        b1Wrong1 = true;
        text2.setText(level_1_data.formulas[randomElement].right);
        b2Correct = true;
        text3.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
        b3Wrong2 = true;
    }
    if(randomFormula == 2) {
        text1.setText(level_1_data.formulas[randomElement].wrong[randomWrong1]);
        b1Wrong1 = true;
        text2.setText(level_1_data.formulas[randomElement].wrong[randomWrong2]);
        b2Wrong2 = true;
        text3.setText(level_1_data.formulas[randomElement].right);
        b3Correct = true;
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

// Closes method        

    

