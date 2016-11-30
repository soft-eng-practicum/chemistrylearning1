var level4 = function(game){
    
};

// Create background variable
var level_4_background;

// Create varibale for group of bubbles
var level_4_bubbles;
var level_4_bubbles_velocity;

// Creat a variable for background bubbles
var level_4_background_bubbles;

// Create variables for the individual bubbles
var level_4_bubble_01, level_4_bubble_02, level_4_bubble_03;

// Create variables for bubble labels
var level_4_bubble_text_01, level_4_bubble_text_02, level_4_bubble_text_03;

// Create varibale for spikes and group of spikes
var level_4_spikes;
var level_4_spike_group;
var level_4_spike_set_01, level_4_spike_set_02, level_4_spike_set_03, level_4_spike_set_04;

// Create variable for score text display
var level_4_score_text;

// Create a variable to display chemical formula name
var level_4_chemical_formula_text_display;

// Ceate a variable to hold the data for the formulas
var level_4_data;

// Create random variables for the formulas and the name
var level_4_current_round, level_4_randomFormula;

var LEVEL_4_SCALE_FOR_ANSWER_BUBBLE = 0.67;
var LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT = 0.62;

var level_4_emitter;

// Ceate count down label to start game
var level_4_count_down_label;

// Create timer varibale
var level_4_game_timer;

// Create boolen for game being in a started state
var level_4_is_started = false;

// Create variable to hold counter value
var level_4_counter = 5;

// Create variable to hold heart image
var level_4_heart_1, level_4_heart_2, level_4_heart_3;

var level_4_short_beep;
var level_4_long_beep;

var level_4_correct_sound;
var level_4_incorrect_sound;

var level_4_pause_delay = 150;

var level_4_check_mark;
var level_4_x_mark;

var level_4_correct = false;
var level_4_wrong  = false;

var level_4_first_go = true;
 


level4.prototype = {  
   
    //Main Phaser Create Function
  	create: function(){ 
		
 // Parse the text back to a JSON object
        switchJSON = Math.floor(Math.random() * 2);
        
        if (switchJSON == 0) {
            level_4_data = JSON.parse(this.game.cache.getText('level_4_JSON')); 
        }
        else if (switchJSON == 1) {
            level_4_data = JSON.parse(this.game.cache.getText('level_4_JSON_series_2'));
        } 
        
        // level_4_data = JSON.parse(this.game.cache.getText('level_4_JSON'));
       
        level_4_background = this.game.add.sprite(0, 0,'rain_Background');
        level_4_background.scale.setTo(.9, 1.6);
        
        level_4_count_down_label = this.game.add.text(this.game.world.centerX-60, 10, "", {font: "120px Courier", fill: "#ffffff"});
        
        level_4_game_timer = this.game.time.create(false);
        level_4_game_timer.loop(1000, level4UpdateCounter, this);
        level_4_game_timer.start();
        
        level_4_heart_1 = this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY-320, 'heart');
        level_4_heart_2 = this.game.add.sprite(this.game.world.centerX+170, this.game.world.centerY-320, 'heart');
        level_4_heart_3 = this.game.add.sprite(this.game.world.centerX+220, this.game.world.centerY-320, 'heart');
   
        level_4_correct_sound = this.game.add.audio('correctSound');
        level_4_correct_sound.volume = 0.1;
        
        level_4_incorrect_sound = this.game.add.audio('wrongSound');
        level_4_incorrect_sound.volume = 0.1;
        
        // Asign the chemical name text display a value
        // Display basic game instructions first
        level_4_chemical_formula_text_display = this.game.add.text(this.game.world.centerX-290, 130, "Select The Correct Bubble", {font: "37px Courier", fill: "White"});
      
        // Pause the main theme music
        music.pause();
        levelMusic.loop = true;
        levelMusic.volume = .5;
        levelMusic.play();
        
        // Assign value to the beep variables
        level_4_short_beep = this.game.add.audio('shortBeep');
        level_4_short_beep.volume = 0.1;
        
        level_4_long_beep = this.game.add.audio('longBeep');
        level_4_long_beep.volume = 0.1;
    
        // Add spike image and set visible to false
        // Image is only used for size attributes it is not displayed in the game
        level_4_spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 250, 'spike_image');
        level_4_spikes.visible = false;
    
        // Set current round to zero
        level_4_current_round = 0;
       
        // Assign value to the random variable
        level_4_randomFormula = Math.floor(Math.random() * 3);
        
        // Assign score a value and the score text display
        level_4_score_text = this.game.add.text(this.game.width-195, 30, "", {font: "30px Courier", fill: "Yellow"});
        level_4_score_text.setText("Score: " + score);
        
        // Create group of bubbles
        level_4_bubbles = this.game.add.group();
       
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        level_4_bubbles.inputEnableChildren = true;
        level_4_bubbles.enableBody = true;
        level_4_bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Set bubbles_velocity
        level_4_bubbles_velocity = 0.7317;
        
        // Create group for bubble labels
        level_4_bubble_labels = this.game.add.group();
        level_4_bubble_labels.enableBody = true;
        level_4_bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected and add them to the bubbles group
        level_4_bubble_01 = level_4_bubbles.create(this.game.width/30, -50, 'bubble_image');
        level_4_bubble_01.events.onInputDown.add(level4SelectedBubble, this);
        level_4_bubble_01.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE);
        
        // Create variable to hold the font style crap
        var style_04 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: level_4_bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        // Create a text label and add it to the bubble_labels group
        level_4_bubble_text_01 = this.game.add.text(Math.floor(level_4_bubble_01.x + level_4_bubble_01.width/2), Math.floor(level_4_bubble_01.y + level_4_bubble_01.height/2), "", style_04, level_4_bubble_labels);
        
        level_4_bubble_text_01.anchor.set(0.5);
        level_4_bubble_text_01.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT);
       
        // Create a text label and add it to the bubble_labels group
        level_4_bubble_02 = level_4_bubbles.create(level_4_bubble_01.x + 200, -50, 'bubble_image');
        level_4_bubble_02.events.onInputDown.add(level4SelectedBubble, this);    
        level_4_bubble_02.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE);
        
        var style_05 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: level_4_bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        level_4_bubble_text_02 = this.game.add.text(Math.floor(level_4_bubble_02.x + level_4_bubble_02.width/2), Math.floor(level_4_bubble_02.y + level_4_bubble_02.height/2), "", style_05, level_4_bubble_labels);
        level_4_bubble_text_02.anchor.set(0.5);
        level_4_bubble_text_02.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT);
        
        // Create a text label and add it to the bubble_labels group
        level_4_bubble_03 = level_4_bubbles.create(level_4_bubble_02.x + 200, -50, 'bubble_image');
        level_4_bubble_03.events.onInputDown.add(level4SelectedBubble, this);
        level_4_bubble_03.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE);
        
        var style_06 = { font: "50px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: level_4_bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        level_4_bubble_text_03 = this.game.add.text(Math.floor(level_4_bubble_03.x + level_4_bubble_03.width/2), Math.floor(level_4_bubble_03.y + level_4_bubble_03.height/2), "", style_06, level_4_bubble_labels);
        level_4_bubble_text_03.anchor.set(0.5);
        level_4_bubble_text_03.scale.setTo(LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT, LEVEL_4_SCALE_FOR_ANSWER_BUBBLE_TEXT);
       
        // Set bubbles not visible 
        level_4_bubbles.visible = false;
        
        level_4_check_mark = this.game.add.sprite(0, 0,"checkMark");
        level_4_check_mark.visible = false;
        level_4_check_mark.scale.setTo(0.6, 0.6);
        
        level_4_x_mark = this.game.add.sprite(0, 0,"xMark");
        level_4_x_mark.visible = false;
        level_4_x_mark.scale.setTo(0.8, 0.8);
                     
        // Create a group of spike sets
        level_4_spike_group = this.game.add.group();
        level_4_spike_group.enableBody = true;
        
        level_4_spike_set_01 = level_4_spike_group.create(0, height - level_4_spikes.height, 'spike_image', level_4_spike_group);
        level_4_spike_set_02 = level_4_spike_group.create(level_4_spike_set_01.x + 300, height - level_4_spikes.height, 'spike_image', level_4_spike_group);
        level_4_spike_set_03 = level_4_spike_group.create(level_4_spike_set_02.x + 300, height - level_4_spikes.height, 'spike_image', level_4_spike_group);
        level_4_spike_set_04 = level_4_spike_group.create(level_4_spike_set_03.x + 300, height - level_4_spikes.height, 'spike_image', level_4_spike_group);
        
        
        //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        level_4_emitter = this.game.add.emitter(this.game.world.centerX, 200, 200);

        //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        level_4_emitter.width = this.game.width - 50;

        level_4_emitter.makeParticles('emitter_bubble_image');

        level_4_emitter.minParticleSpeed.set(0, 300);
        level_4_emitter.maxParticleSpeed.set(0, 400);

        level_4_emitter.setRotation(0, 0);
        level_4_emitter.setAlpha(0.3, 0.8);
        level_4_emitter.setScale(0.5, 0.5, 1, 1);
        level_4_emitter.gravity = -200;

        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        level_4_emitter.start(false, 5000, 100);
        
        //Code for the pause menu
        //Create a pause label to use as a button
        // pause_label comes from levl1.js
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
            // pauseW and pauseH come from level1.js
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
        
        level_4_counter = 5;
        level_4_is_started = false;
        level_4_pause_delay = 150;
        level_4_correct = false;
        level_4_wrong = false;
        level_4_first_go = true;
        level_4_Transition = false;
        level_5_Transition = true;

    }, 
    
    // Function holds information for things that move 24fps 
    update: function () {

        level_4_bubbles.y += level_4_bubbles_velocity;
        level_4_bubble_labels.y += level_4_bubbles_velocity;
        level_4_check_mark.y += level_4_bubbles_velocity;
        level_4_x_mark.y += level_4_bubbles_velocity;
        
        // Set whats happens when bubbles hit spikes
        this.game.physics.arcade.overlap(level_4_bubbles, level_4_spike_group, level4BubbleHitSpike, null, this);
       
        level_4_score_text.setText("Score: " + score);
      
       if (level_4_is_started) {
           if (level_4_first_go) {
                level4HandleData();
                level_4_first_go = false;
           }
           level_4_bubbles.visible = true;
           
           if (level_4_correct == true) {
               level_4_pause_delay--;
               level_4_game_timer.pause();
               
               if(level_4_bubble_01.visible == false) {
                    level_4_check_mark.x = level_4_bubble_01.x + 70;
                    level_4_check_mark.y = level_4_bubble_01.y + 170;
                    level_4_check_mark.visible = true;
                    level_4_x_mark.y = level_4_bubble_01.y + 200;
                    level_4_bubble_01.visible = true;
                    level_4_bubbles_velocity = 0;
                }
                else if (level_4_bubble_02.visible == false) {
                    level_4_check_mark.x = level_4_bubble_02.x + 70;
                    level_4_check_mark.y = level_4_bubble_02.y + 170;
                    level_4_check_mark.visible = true;
                    level_4_x_mark.y = level_4_bubble_02.y + 200;
                    level_4_bubble_02.visible = true;
                    level_4_bubbles_velocity = 0;
                }
                else if (level_4_bubble_03.visible == false) {
                    level_4_check_mark.x = level_4_bubble_03.x + 70;
                    level_4_check_mark.y = level_4_bubble_03.y + 170;
                    level_4_check_mark.visible = true;
                    level_4_x_mark.y = level_4_bubble_03.y + 200;
                    level_4_bubble_03.visible = true;
                    level_4_bubbles_velocity = 0;
                }
               
                if (level_4_pause_delay < 1) {
                    level_4_check_mark.visible = false;
                    level_4_correct = false;
                    level_4_pause_delay = 150;
                    level_4_bubbles_velocity = 0.7317;
                    level_4_counter = 8;
                    level_4_game_timer.resume();
                  
                    if(level_4_current_round < 5){
                        level4HandleData();
                    }
                    else if (level_4_current_round > 4) {
                        this.game.state.start('Transition');
                    } 
               }
             }
           
           if (level_4_wrong == true) {
               level_4_pause_delay = level_4_pause_delay - 10;
               
               if(level_4_bubble_01.visible == false){
                    level_4_x_mark.x = level_4_bubble_01.x + 30;
                    level_4_x_mark.y += level_4_bubbles_velocity;
                    level_4_x_mark.visible = true;
                    level_4_bubble_01.visible = true;
                }
                else if (level_4_bubble_02.visible == false){
                    level_4_x_mark.x = level_4_bubble_02.x + 30;
                    level_4_x_mark.y += level_4_bubbles_velocity;
                    level_4_x_mark.visible = true;
                    level_4_bubble_02.visible = true;
                }
                else if(level_4_bubble_03.visible == false){
                    level_4_x_mark.x = level_4_bubble_03.x + 30;
                    level_4_x_mark.y += level_4_bubbles_velocity;
                    level_4_x_mark.visible = true;
                    level_4_bubble_03.visible = true;
                }
               
                if(level_4_pause_delay < 1){
                    level_4_x_mark.visible = false;
                    level_4_x_mark.y = level_4_bubbles.y;
                    level_4_wrong = false;
                    level_4_pause_delay = 150;
               }
             }
           }

        // Handle hearts and lives 
        if (lives == 2) {
            
            level_4_heart_1.visible = false;
            
        } else if (lives == 1) {
           
            level_4_heart_1.visible = false;
            level_4_heart_2.visible = false;
        
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
        level_4_count_down_label.setText(level_4_counter);
        
          //Chnages Count Down Label Red
        if (level_4_counter <= 5) {
            level_4_count_down_label.addColor("RED", 0);
        }
        else if (level_4_counter > 5) {
            level_4_count_down_label.addColor("#ffffff", 0);
        } 
    } 
};

function level4UpdateCounter() {  
        
    //Game Time not started 
    if(level_4_is_started == false) {
        level_4_counter--;
        level_4_short_beep.play();
            
        if(level_4_counter < 1){
            level_4_short_beep.pause();
            level_4_long_beep.play();
        }
            
        if(level_4_counter <= 0) { 
            level_4_counter = 8;
            level_4_is_started = true;
        }
    }
        //Game Time has started 
    else if(level_4_is_started == true) {
        level_4_counter--;
        
        if (level_4_counter < 1) {
            
            level_4_incorrect_sound.play();
            
            if (lives == 3) {
                lives = 2;
                level_4_counter = 8;
                }
            else if (lives == 2) {
                lives = 1;
                level_4_counter = 8;
            }
            else {
                lives = 0;
                level_4_counter = 0;
            }
        }
    }
// Closes method
}

// Collision handler for bubbles and spikes
function level4BubbleHitSpike(input_bubble) {
  //  input_bubble.visible = false;
  //  bubble_labels.visible = false;
    level_4_bubbles.y = level_4_bubble_01.height + 55;
    level_4_bubble_labels.y = level_4_bubble_01.height + 55;
}

// Collision handler for selected bubble
function level4SelectedBubble(level_4_bubble) {

    /*Stops user from clicking when the check is displayed
      IMPORTANT!!!!*/
    if(level_4_correct == false){
        if (level_4_bubble === level_4_bubble_01) { 
            level_4_bubble_01.visible = false;
           level4CheckIfSelectedBubbleIsRight(level_4_bubble_text_01.text);
            
            } 

        if (level_4_bubble === level_4_bubble_02) {
            level_4_bubble_02.visible = false;
            level4CheckIfSelectedBubbleIsRight(level_4_bubble_text_02.text);
                
        } 

        if (level_4_bubble === level_4_bubble_03) { 
            level_4_bubble_03.visible = false;
            level4CheckIfSelectedBubbleIsRight(level_4_bubble_text_03.text);
            
        }
    }
}

function level4CheckIfSelectedBubbleIsRight(level_4_bubble_text) {
    
    // Condition for what happens if user gets formula 1 right
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula1.right) {

        level4StuffThatHappensWhenAnswerIsRight();
    } 

    
    // Condition for what happens if user gets formula 1 wrong
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong1 ||      
        level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong2 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong3 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong4 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong5 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula1.wrong6 ) {
        
        level4StuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 2 right
	if (level_4_bubble_text === level_4_data.chemical_formulas.formula2.right) {
        
       level4StuffThatHappensWhenAnswerIsRight();
    }
    
    // Condition for what happens if user gets formula 2 wrong
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong1 ||      
        level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong2 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong3 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong4 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong5 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula2.wrong6 ) {
        
        level4StuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 3 right
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula3.right) {
        
        level4StuffThatHappensWhenAnswerIsRight();
    }
    
    // Condition for what happens if user gets formula 3 wrong
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong1 ||      
        level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong2 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong3 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong4 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong5 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula3.wrong6 ) {
       
        level4StuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 4 right
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula4.right) {
   
       level4StuffThatHappensWhenAnswerIsRight();
    } 
    
     // Condition for what happens if user gets formula 4 wrong
    if (level_4_bubble_text ===  level_4_data.chemical_formulas.formula4.wrong1  ||      
        level_4_bubble_text === level_4_data.chemical_formulas.formula4.wrong2  ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula4.wrong3  ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula4.wrong4  ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula4.wrong5  ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula4.wrong6  ) {
        
        level4StuffThatHappensWhenAnswerIsWrong();
    }
     // Condition for what happens if user gets formula 5 right
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula5.right) {

        level4StuffThatHappensWhenAnswerIsRight();
    }
    
     // Condition for what happens if user gets formula 5 wrong
    if (level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong1 ||      
        level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong2 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong3 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong4 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong5 ||
        level_4_bubble_text === level_4_data.chemical_formulas.formula5.wrong6 ) {
        
        level4StuffThatHappensWhenAnswerIsWrong();
    }
   
    console.log("This is the value passed to level4CheckIfSelectedBubbleIsRight(): " + level_4_bubble_text);
}

/* Function holds the functionality for what happens
    when the user gets the answer correct 
*/
function level4StuffThatHappensWhenAnswerIsRight() {
   
    // Increase score by 50 
    score += 50;
    
    /* 
        Check to see if it is the last round,
        if it is then advance to the next
        level
    */ 
    level_4_current_round++;
    
    // Changes the data values 
    level_4_randomFormula = Math.floor(Math.random() * 3);
    
    // Reset the postion of the bubble group
    level4ResetBubblePosition();
    
    // Reset the counter to 8
    level_4_counter = 8;
     
    level_4_correct_sound.play();
    
    level_4_correct = true;

}

/* Function holds the functionality for what happens
    when the user gets the answer wrong 
*/
function level4StuffThatHappensWhenAnswerIsWrong() {
    
    // Decrease score by 50
    score -= 50;
   
    // Play sound for wrong answer
    level_4_incorrect_sound.play();
    
    // Decrease lives by one
    lives--;
    
    level_4_wrong = true;
 
}

// Function will reset the y position of the bubbles
function level4ResetBubblePosition() {
    level_4_bubbles.y =  level_4_bubble_01.height + 55;
    level_4_bubble_labels.y = level_4_bubble_01.height + 55;
}

/* 
    Function handles the data for the bubble lables 
    assigning a different value for the bubble labels
    from a JSON data file
*/
function level4HandleData() {
    
    //Adjusting Instruction label color
    level_4_chemical_formula_text_display.anchor.setTo(-0.1, 0.2);
    level_4_chemical_formula_text_display.addColor("Yellow", 0);
    
    if (level_4_current_round == 0) {
        level_4_chemical_formula_text_display.setText(level_4_data.chemical_formulas.formula1.name);
        
        if(level_4_data.chemical_formulas.formula1.name.length < 20){
            
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 47;  
        }
        else{
            //Adjusting Instruction label for Chemical Names
            level_4_chemical_formula_text_display.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 39;
        }
            
        if (level_4_randomFormula == 0) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula1.right);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula1.wrong1);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula1.wrong2);
        }
        else if (level_4_randomFormula == 1) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula1.wrong3);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula1.right);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula1.wrong4);
        }
        else if (level_4_randomFormula == 2) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula1.wrong5);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula1.wrong6);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula1.right);
        }
    }
        
        
/////////////////////////////////////////////////////////////////////////////////////////
    if (level_4_current_round == 1) {
        level_4_chemical_formula_text_display.setText(level_4_data.chemical_formulas.formula2.name);
        
        if(level_4_data.chemical_formulas.formula2.name.length < 20){
            
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 47;  
        }
        else{
            //Adjusting Instruction label for Chemical Names
            level_4_chemical_formula_text_display.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 39;
        }

        if (level_4_randomFormula == 0) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula2.right);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula2.wrong1);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula2.wrong2);
               
        }
        else if (level_4_randomFormula == 1) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula2.wrong3);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula2.right);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula2.wrong4);
                
               
        }
        else if (level_4_randomFormula == 2) { 
               level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula2.wrong5);
               level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula2.wrong6);
               level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula2.right);
           } 
      }
//////////////////////////////////////////////////////////////////////////////////////////
       if (level_4_current_round == 2) {
         level_4_chemical_formula_text_display.setText(level_4_data.chemical_formulas.formula3.name);
           
           if(level_4_data.chemical_formulas.formula3.name.length < 20){
            
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 47;  
            }
            else{
                //Adjusting Instruction label for Chemical Names
                level_4_chemical_formula_text_display.anchor.setTo(0, 0.3);
                //Adjusting Instruction label Font Size
                level_4_chemical_formula_text_display.fontSize = 39;
            }

           if (level_4_randomFormula == 0) { 
               level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula3.right);
               level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula3.wrong1);
               level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula3.wrong2);
           }
        else if (level_4_randomFormula == 1) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula3.wrong3);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula3.right);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula3.wrong4);
        }
        else if (level_4_randomFormula == 2) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula3.wrong5);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula3.wrong6);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula3.right);2
        }
    }
 
////////////////////////////////////////////////////////////////////////////////////////      
    if (level_4_current_round == 3) {
        level_4_chemical_formula_text_display.setText(level_4_data.chemical_formulas.formula4.name);
        
        if(level_4_data.chemical_formulas.formula4.name.length < 20){
            
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 47;  
        }
        else{
            //Adjusting Instruction label for Chemical Names
            level_4_chemical_formula_text_display.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 39;
        }

        if (level_4_randomFormula == 0) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula4.right);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula4.wrong1);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula4.wrong2);
        }
        else if (level_4_randomFormula == 1) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula4.wrong3);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula4.right);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula4.wrong4);
        }
        else if (level_4_randomFormula == 2) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula4.wrong5);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula4.wrong6);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula4.right);
        } 
    }
 
//////////////////////////////////////////////////////////////////////////////////////        
    if (level_4_current_round == 4) {
         
        level_4_chemical_formula_text_display.setText(level_4_data.chemical_formulas.formula5.name);
        
        if(level_4_data.chemical_formulas.formula5.name.length < 20){
            
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 47;  
        }
        else{
            //Adjusting Instruction label for Chemical Names
            level_4_chemical_formula_text_display.anchor.setTo(0, 0.3);
            //Adjusting Instruction label Font Size
            level_4_chemical_formula_text_display.fontSize = 39;
        }

        if (level_4_randomFormula == 0) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula5.right);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula5.wrong1);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula5.wrong2);
        }
        else if (level_4_randomFormula == 1) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula5.wrong3);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula5.right);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula5.wrong4);
        }
        else if (level_4_randomFormula == 2) { 
            level_4_bubble_text_01.setText(level_4_data.chemical_formulas.formula5.wrong5);
            level_4_bubble_text_02.setText(level_4_data.chemical_formulas.formula5.wrong6);
            level_4_bubble_text_03.setText(level_4_data.chemical_formulas.formula5.right);
        }   
    }
}