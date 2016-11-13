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

// Create variable for score and score text display
var score;
var score_text;

// Create variable to hold the delay value for the respawn of chemical formulas
var delay = 215;

// Create a variable to display chemical formula name
var chemical_formula_text_display;

// Ceate a variable to hold the data for the formulas
var level_2_data;

// Create random variables for the formulas and the name
var randomElement, randomFormula;

var SCALE_FOR_ANSWER_BUBBLE = 0.75;

var correct_answer, wrong_answer;

var emitter;


// Create an array of the main functions of the game 
level2.prototype = {

    // Create funion runs one time only
    create: function () {
       
        background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'level_2_background_image');
    
        // Asign the chemical name text display a value
        // Display basic game instructions first
        chemical_formula_text_display = this.game.add.text(0, 0, "Please select the correct \nbubble before they \nhit the spikes.", {font: "40px Courier", fill: "Yellow"});
      
        // Add spike image and set visible to false
        // Image is only used for size attributes it is not displayed in the game
        spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 250, 'spike_image');
        spikes.visible = false;
    
        // Parse the text back to a JSON object
        level_2_data = JSON.parse(this.game.cache.getText('level_2_JSON'));
        
        // Print data to the console
        console.log(level_2_data);
        
        // Assign value to the random variable
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);
        
        // Assign score a value and the score text display
        score = 0;
        score_text = this.game.add.text(30, 30, "", {font: "40px Courier", fill: "Yellow"});
        score_text.setText("Score: " + score);
        score_text.visible = false;
        
        // Create group of bubbles
        bubbles = this.game.add.group();
       
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        bubbles.inputEnableChildren = true;
        bubbles.enableBody = true;
        bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Set bubbles_velocity
        bubbles_velocity = 0.7;
        
        // Create group for bubble labels
        bubble_labels = this.game.add.group();
        bubble_labels.enableBody = true;
        bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected and add them to the bubbles group
        bubble_01 = bubbles.create(this.game.width/6, 0, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        bubble_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create variable to hold the font style crap
        var style_01 = { font: "42px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        // Create a text label and add it to the bubble_labels group
        bubble_text_01 = this.game.add.text(Math.floor(bubble_01.x + bubble_01.width/2), Math.floor(bubble_01.y + bubble_01.height/2), "", style_01, bubble_labels);
        
        bubble_text_01.anchor.set(0.5);
        bubble_text_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Create a text label and add it to the bubble_labels group
        bubble_02 = bubbles.create(bubble_01.x + 250, 0, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
        bubble_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_02 = { font: "42px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        bubble_text_02 = this.game.add.text(Math.floor(bubble_02.x + bubble_02.width/2), Math.floor(bubble_02.y + bubble_02.height/2), "", style_02, bubble_labels);
        bubble_text_02.anchor.set(0.5);
        bubble_text_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create a text label and add it to the bubble_labels group
        bubble_03 = bubbles.create(bubble_02.x + 250, 0, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
        bubble_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_03 = { font: "42px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        bubble_text_03 = this.game.add.text(Math.floor(bubble_03.x + bubble_03.width/2), Math.floor(bubble_03.y + bubble_03.height/2), "", style_03, bubble_labels);
        bubble_text_03.anchor.set(0.5);
        bubble_text_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Set bubbles not visible 
        bubbles.visible = false;
       
        
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
        
        
        /* background_bubbles = game.add.group();
        background_bubbles.enableBody = true;
        background_bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 75; i++) {
            var bubble = background_bubbles.create(Math.random() * (i + width/4), Math.random() * height, 'bubble_image');
            bubble.events.onInputDown.add(selectedBubble, this);
            bubble.scale.setTo(0.35, 0.35);
        } 
        
        var tween = game.add.tween(background_bubbles).to({x: innerWidth, y: innerHeight}, 6000, Phaser.Easing.Linear.None, true, 0, 2000, true);
        tween.onLoop.add(descend,this); */
    },

    // Function holds information for things that move 24fps 
    update: function () {
        
        bubbles.y += bubbles_velocity;
        bubble_labels.y += bubbles_velocity;
        
        // Update text label positions
       // bubble_text_01.x = Math.floor(bubble_01.x + bubble_01.width/2);
       // bubble_text_01.y = Math.floor(bubble_01.y + bubble_01.height/2);
        
      //  bubble_text_02.x = Math.floor(bubble_02.x + bubble_02.width/2);
    //    bubble_text_02.y = Math.floor(bubble_02.y + bubble_02.height/2);
        
    //    bubble_text_03.x = Math.floor(bubble_03.x + bubble_03.width/2);
    //    bubble_text_03.y = Math.floor(bubble_03.y + bubble_03.height/2); 
        
     //   if (game.input.activePointer.isDown == true) {
     //      background_velocity = 25;
    //    } else {
     //       background_velocity = 2;
      //  } 
        
        
        // Set whats happens when bubbles hit spikes
        this.game.physics.arcade.overlap(bubbles, spike_group, bubbleHitSpike, null, this);
       
        
        score_text.setText("Score: " + score);
      
       
       //Delay for respawn of formulas
        delay--;

        if(delay == 0) {
            handleData();
            // Set bubbles visible
            bubbles.visible = true;
            score_text.visible = true;
            delay = 10;   
        }
    },
    
    // Function holds information for things that move 50fps
    render: function () {

    } 

};

// Collision handler for bubbles and spikes
function bubbleHitSpike(input_bubble) {
    input_bubble.visible = false;
    bubble_labels.visible = false;
}

// Collision handler for selected bubble
function selectedBubble(input_bubble) {

    if (input_bubble === bubble_01) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_01.text);
        } 
        
    if (input_bubble === bubble_02) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_02.text);
        } 
        
    if (input_bubble === bubble_03) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_03.text);
        }
}

function descend() {
    bubbles.y += 10;
}

function checkIfSelectedBubbleIsCorrect(input_bubble_text) {
    
    // Create variable to hold increment value   
    var score_increment = 50;
    
    // Condition for what happens if user gets formula 1 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.right) {
        score += score_increment;
       
        randomElement = 1; // Changes the data values 
        randomFormula = Math.floor(Math.random() * 3);
        //makeBubblesAndLablesVisible();
        
        resetBubblesPosition();
        
        bubbles_velocity = 0.7;
    } 
   
    // Condition for what happens if user gets formula 1 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong7 ) {
        
        score -= 50;
        bubbles_velocity += 0.5;
    }
    
     // Condition for what happens if user gets formula 2 right
	if (input_bubble_text === level_2_data.chemical_formulas.formula2.right) {
        score += score_increment;
        
        randomElement = 2;
        randomFormula = Math.floor(Math.random() * 3);
        
        resetBubblesPosition();
        bubbles_velocity = 0.7;
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
        
        score -= 50;
       
        bubbles_velocity += 0.5;
    }
    
     // Condition for what happens if user gets formula 3 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.right) {
        score += score_increment;
       
        randomElement = 3;
        randomFormula = Math.floor(Math.random() * 3);
        
        resetBubblesPosition();
        bubbles_velocity = 0.7;
    }
    
    // Condition for what happens if user gets formula 3 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong6 ) {
        
        score -= 50;
        
        bubbles_velocity += 0.5;
    }
    
     // Condition for what happens if user gets formula 4 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula4.right) {
        score += score_increment;
        
        randomElement = 4;
        randomFormula = Math.floor(Math.random() * 3);
        
        resetBubblesPosition();
        bubbles_velocity = 0.7;
    } 
    
     // Condition for what happens if user gets formula 4 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula4.wrong1  ||      
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
        
        score -= 50;
        
        bubbles_velocity += 0.5;
    }
     // Condition for what happens if user gets formula 5 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula5.right) {
        score += score_increment;
        
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);
        
        resetBubblesPosition();
        bubbles_velocity = 0.7;
        
        this.game.state.start('Level5');
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
        
        score -= 50;
        
        bubbles_velocity += 0.5;
    }
   
    console.log("This is the value passed to checkIfSelectedBubbleIsCorrect(): " + input_bubble_text);
    //console.log("This is the value input_bubble_text needs to be inside checkIfSelectedBubbleIsCorrect(): " + level_2_data.easy.formula1.right);
    //makeBubblesAndLablesVisible(input_bubble);
      
}

// Function will reset the y position of the bubbles
function resetBubblesPosition() {
    bubbles.y =  bubble_01.height * 0.50;
    bubble_labels.y = bubble_01.height * 0.50;
}


 /* function makeBubblesAndLablesVisible() {
        
    if (input_bubble.visible == false) {
        
        bubble_01.visible = true;
        bubble_02.visible = true;
        bubble_03.visible = true;
        
        bubble_text_01.visible = true;
        bubble_text_02.visible = true;
        bubble_text_03.visible = true;
    }
} */

/* 
    Function handles the data for the bubble lables 
    assigning a different order of labels 
    */
function handleData() {
               
        if (randomElement == 0) {
            chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula1.name);
            
            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula1.right);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula1.wrong1);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula1.wrong2);
                
               // randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 1;
                
                 /*if(bubble_01.visible == false) {
                     correct_answer = true; 
                     score = score + 50;
                     bubble_01.visible = true;
                     bubble_text_01.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 1;
                    }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                      
                    }
                if ( bubble_03.visible == false) {
                     wrong_answer = true;
                     
                    } */
            }
            else if (randomFormula == 1) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula1.wrong3);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula1.right);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula1.wrong4);
                
                //randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 1;
                
                /*if (bubble_01.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_02.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_text_02.visible = true;
                    bubble_02.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 1;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                     
                } */
            }
            else if (randomFormula == 2) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula1.wrong5);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula1.wrong6);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula1.right);
                //randomFormula = Math.floor(Math.random() * 3);
                //randomElement = 1;
                
                /*if (bubble_01.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_03.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_text_03.visible = true;
                    bubble_03.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 1;
                } */
            } 
            
                
        }
        
        
/////////////////////////////////////////////////////////////////////////////////////////
        if (randomElement == 1) {
          chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula2.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula2.right);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula2.wrong1);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula2.wrong2);
               
               // randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 2;
                
                /*if (bubble_01.visible == false) {
                     correct_answer = true;
                     score = score + 50;
                     bubble_01.visible = true;
                     bubble_text_01.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 2;
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                     
                }  */
            }
            else if (randomFormula == 1) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula2.wrong3);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula2.right);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula2.wrong4);
                
               // randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 2;
                
                /*if (bubble_01.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_02.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_02.visible = true;
                    bubble_text_02.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 2;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true; 
                } */
            }
            else if (randomFormula == 2) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula2.wrong5);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula2.wrong6);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula2.right);
                
                //randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 2;
            /*    if (bubble_01.visible == false) {
                     wrong_answer = true; 
                }
                if (bubble_02.visible == false) {
                     wrong = true; 
                }
                if (bubble_03.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_03.visible = true;
                    bubble_text_03.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 2;
                }  */
            } 
        }
//////////////////////////////////////////////////////////////////////////////////////////
        if (randomElement == 2) {
          chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula3.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula3.right);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula3.wrong1);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula3.wrong2);
                
                //randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 3;
                
               /* if (bubble_01.visible == false) {
                     correct_answer = true;
                     score = score + 50;
                     bubble_01.visible = true;
                     bubble_text_01.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 3;
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                     
                } */
            }
            else if (randomFormula == 1) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula3.wrong3);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula3.right);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula3.wrong4);
                
                //randomFormula = Math.floor(Math.random() * 3);
               // randomElement = 3;
                
               /* if (bubble_01.visible== false) {
                     wrong_answer = true;
                }
                if (bubble_02.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_02.visible = true;
                    bubble_text_02.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 3;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true; 
                } */
            }
            else if (randomFormula == 2) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula3.wrong5);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula3.wrong6);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula3.right);2
               
                
               // randomFormula = Math.floor(Math.random() * 3);
                //randomElement = 3;
               /* if (bubble_01.visible == false) {
                     wrong_answer = true;
                    bubbles.visibility = true; 
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_03.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_03.visible = true;
                    bubble_text_03.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 3;
                } */
            }
        }
 
////////////////////////////////////////////////////////////////////////////////////////      
        if (randomElement == 3) {
          chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula4.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula4.right);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula4.wrong1);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula4.wrong2);
               
                randomFormula = Math.floor(Math.random() * 3);
                //     randomElement = 4;
                /* if (bubble_01.visible == false) {
                     correct_answer = true;
                     score =+ 50;
                     bubble_01.visible = true;
                     bubble_text_01.visible = true;
                     randomFormula = Math.floor(Math.random() * 3);
                     randomElement = 4;
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                    
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                     
                } */
            }
            else if (randomFormula == 1) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula4.wrong3);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula4.right);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula4.wrong4);

             //   randomFormula = Math.floor(Math.random() * 3);
             //        randomElement = 4;
             /*   if (bubble_01.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_02.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_02.visible = true;
                    bubble_text_02.visible = true; 
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 4;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                
                } */
            }
            else if (randomFormula == 2) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula4.wrong5);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula4.wrong6);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula4.right);

               // randomFormula = Math.floor(Math.random() * 3);
              //       randomElement = 4;
                
               /* if (bubble_01.visible == false) {
                     wrong_answer = true;
                     
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                    
                }
                if (bubble_03.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_03.visible = true;
                    bubble_text_03.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    randomElement = 4;
                } */
            } 
        }
 
//////////////////////////////////////////////////////////////////////////////////////        
        if (randomElement == 4) {
         
            chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula5.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula5.right);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula5.wrong1);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula5.wrong2);

              //  randomFormula = Math.floor(Math.random() * 3);
                
               /*  if (bubble_01.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_01.visible = true;
                    bubble_text_01.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    //this.game.state.start("Level2");
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                } */
            }
            else if (randomFormula == 1) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula5.wrong3);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula5.right);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula5.wrong4);
              //  randomFormula = Math.floor(Math.random() * 3);
             /*   if (bubble_01.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_02.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_02.visible = true;
                    bubble_text_02.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    //this.game.state.start("Level2");
                }
                if (bubble_03.visible == false) {
                     wrong_answer = true;
                } */
            }
            else if (randomFormula == 2) { 
                bubble_text_01.setText(level_2_data.chemical_formulas.formula5.wrong5);
                bubble_text_02.setText(level_2_data.chemical_formulas.formula5.wrong6);
                bubble_text_03.setText(level_2_data.chemical_formulas.formula5.right);
               // randomFormula = Math.floor(Math.random() * 3);
               /* if (bubble_01.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_02.visible == false) {
                     wrong_answer = true;
                }
                if (bubble_03.visible == false) {
                    correct_answer = true;
                    score = score + 50;
                    bubble_03.visible = true;
                    bubble_text_03.visible = true;
                    randomFormula = Math.floor(Math.random() * 3);
                    //this.game.state.start("Level2");
                } */
            } 
        
                //Adjusting Instruction label for Chemical Names 
                chemical_formula_text_display.anchor.setTo(-0.1, 0);
                chemical_formula_text_display.addColor("Yellow", 0);
                chemical_formula_text_display.fontSize = 40;
            
        }
// Closes method        
}
    

