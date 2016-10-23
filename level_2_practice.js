// Variables for width and height
var width = 1365;
var height = 650;
// Instantiate Phaser game object
var game = new Phaser.Game(width, height, Phaser.Auto);

// Create background variables
var background;
var background_velocity;

// Create varibale for group of bubbles
var bubbles;
var bubbles_velocity;

// Creat a variable for background bubbles
var background_bubbles;

// Create variables for the individual bubbles
var bubble_01, bubble_02, bubble_03;

// Create variables for bubble labels
var bubble_text_01, bubble_text_02, bubble_text_03;

// Create variable for score and score text display
var score;
var score_text;

// Create variable toooo hold the delay value for the respawn of chemical formulas
var delay = 115;

// Create a variable to display chemical formula name
var chemical_formula_text_display;

// Ceate a variable to hold the data for the formulas
var level_2_data;

// Create random variables for the formulas and the name
var randomElement, randomFormula;


var correct_answer, wrong_answer;

// Create an array of the main functions of the game 
var mainState = {

    // Preload function will run  before the game starts and load images to memory
    preload: function () {
        game.load.image('space_background_image', "assets/space_background.jpg");
        game.load.image('bubble_image', "assets/bubble256.png");
        
        //Load JSON file as a text file
        game.load.text('level_2_chemical_formulas', "assets/game_data/level_2_data.json");
    },

    // function for adding pictures that are mostly static 
    create: function () {
       
        
        background = game.add.tileSprite(0, 0, width, height,'space_background_image');
        background_velocity = 3;
        
        // Handles the responsive design
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
         
        // Parse the text back to a JSON object
        level_2_data = JSON.parse(this.game.cache.getText('level_2_chemical_formulas'));
        
        // Print data to the console
        console.log(level_2_data);
        
        // Assign value to the random variable
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);
        
        // Assign score a value and the score text display
        score = 0;
        score_text = game.add.text(30, 30, "", {font: "40px Courier", fill: "Yellow"});
        score_text.setText("Score: " + score);
        
        // Asign the chemical name text display a value
        chemical_formula_text_display = game.add.text(width/2, 0, "", {font: "40px Courier", fill: "Yellow"});
        
        // Create group of bubbles
        bubbles = game.add.group();
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        bubbles.inputEnableChildren = true;
        bubbles.enableBody = true;
        bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        bubbles_velocity = 4;
        
      
        // Moves the image anchor to the middle, so it centers inside the game properly
        //bubbles.anchor.set(0.5);
        
        bubble_labels = game.add.group();
       // bubble_labels.inputEnableChildren = true;
        bubble_labels.enableBody = true;
        bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected
        bubble_01 = bubbles.create(width/4 - 220, 0, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        bubble_01.scale.setTo(0.75, 0.75);
        
        // Create variable to hold the font style crap
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        bubble_text_01 = game.add.text(0,0, "", style, bubble_labels);
        
        bubble_text_01.anchor.set(0.5);
        //bubble_text_01.events.onInputDown.add(selectedBubble, this);
        bubble_text_01.scale.setTo(0.75, 0.75);
       
        bubble_02 = bubbles.create(bubble_01.x + 325, 0, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
        bubble_02.scale.setTo(0.75, 0.75);
        
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        bubble_text_02 = game.add.text(0,0, "", style, bubble_labels);
        bubble_text_02.anchor.set(0.5);
        //bubble_text_02.events.onInputDown.add(selectedBubble, this);
        bubble_text_02.scale.setTo(0.75, 0.75);
        
        bubble_03 = bubbles.create(bubble_02.x + 325, 0, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
        bubble_03.scale.setTo(0.75, 0.75);
        
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        bubble_text_03 = game.add.text(0,0, "", style, bubble_labels);
        bubble_text_03.anchor.set(0.5);
        //bubble_text_03.events.onInputDown.add(selectedBubble, this);
        bubble_text_03.scale.setTo(0.75, 0.75);
        
        var tween = game.add.tween(bubbles).to({x: 200, y: innerHeight - bubbles.height}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onLoop.add(descend,this);
        
        var tween = game.add.tween(bubble_labels).to({x: 200, y: innerHeight - bubbles.height}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onLoop.add(descend,this);
        
        
        background_bubbles = game.add.group();
        background_bubbles.enableBody = true;
        background_bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 75; i++) {
            var bubble = background_bubbles.create(Math.random() * (i + width/4), Math.random() * height, 'bubble_image');
            bubble.events.onInputDown.add(selectedBubble, this);
            bubble.scale.setTo(0.35, 0.35);
        } 
        
        var tween = game.add.tween(background_bubbles).to({x: innerWidth, y: innerHeight}, 3000, Phaser.Easing.Linear.None, true, 0, 2000, true);
        tween.onLoop.add(descend,this);
    },

    // Function holds information for things that move 24fps 
    // Checks for input from user and collisions between game characters
    update: function () {
        background.tilePosition.y += background_velocity;
        
        // Update text label positions
        bubble_text_01.x = Math.floor(bubble_01.x + bubble_01.width/2);
        bubble_text_01.y = Math.floor(bubble_01.y + bubble_01.height/2);
        
        bubble_text_02.x = Math.floor(bubble_02.x + bubble_02.width/2);
        bubble_text_02.y = Math.floor(bubble_02.y + bubble_02.height/2);
        
        bubble_text_03.x = Math.floor(bubble_03.x + bubble_03.width/2);
        bubble_text_03.y = Math.floor(bubble_03.y + bubble_03.height/2); 
        
        if (game.input.activePointer.isDown == true) {
           background_velocity = 25;
        } else {
            background_velocity = 2;
        } 
        
        score_text.setText("Score: " + score);
      
       
       //Delay for respawn of formulas
        delay--;

        if(delay == 0) {
            handleData();
            delay = 10;   
        }
    },
    
    // Function holds information for things that move 50fps
    render: function () {
        
    }

};


// Collision handler for selected bubble
function selectedBubble(input_bubble) {
    input_bubble.visible = false;
    
     if (input_bubble.visible == false) {
            
        if (input_bubble === bubble_01) {   
                bubble_text_01.visible = false;
                checkIfSelectedBubbleIsCorrect(bubble_text_01.text);
        } else if (input_bubble === bubble_02) {   
                bubble_text_02.visible = false;
                checkIfSelectedBubbleIsCorrect(bubble_text_02.text);
        } else if (input_bubble === bubble_03) {   
                bubble_text_03.visible = false;
                checkIfSelectedBubbleIsCorrect(bubble_text_03.text);
        }
     }
    makeBubblesAndLablesVisible(input_bubble);
   // console.log("You selected a bubble!");
}

function descend() {
    bubbles.y += 10;
}

function checkIfSelectedBubbleIsCorrect(input_bubble_text) {
    
    
    if (input_bubble_text === level_2_data.easy.formula1.right) {
        score += 50;
        randomElement = 1;
        randomFormula = Math.floor(Math.random() * 3);

    } else if (input_bubble_text === level_2_data.easy.formula2.right) {
        score += 50;
        randomElement = 2;
        randomFormula = Math.floor(Math.random() * 3);
        
    } else if (input_bubble_text === level_2_data.easy.formula3.right) {
        score += 50;
        randomElement = 3;
        randomFormula = Math.floor(Math.random() * 3);

    } else if (input_bubble_text === level_2_data.easy.formula4.right) {
        score += 50;
        randomElement = 4;
        randomFormula = Math.floor(Math.random() * 3);

    } else if (input_bubble_text === level_2_data.easy.formula5.right) {
        score += 50;
        randomElement = 0;
        randomFormula = Math.floor(Math.random() * 3);
    } 
    
    
    console.log("This is the value passed to checkIfSelectedBubbleIsCorrect(): " + input_bubble_text);
    //console.log("This is the value input_bubble_text needs to be inside checkIfSelectedBubbleIsCorrect(): " + level_2_data.easy.formula1.right);
}

function makeBubblesAndLablesVisible(input_bubble) {
        
    if (input_bubble.visible == false) {
        bubble_01.visible = true;
        bubble_02.visible = true;
        bubble_03.visible = true;
        
        bubble_text_01.visible = true;
        bubble_text_02.visible = true;
        bubble_text_03.visible = true;
    }
}

//HandleData Function to Decide Right & Wrong Answers
function handleData() {
               
        if (randomElement == 0) {
            chemical_formula_text_display.setText(level_2_data.easy.formula1.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.easy.formula1.right);
                bubble_text_02.setText(level_2_data.easy.formula1.wrong1);
                bubble_text_03.setText(level_2_data.easy.formula1.wrong2);
                
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
                bubble_text_01.setText(level_2_data.easy.formula1.wrong3);
                bubble_text_02.setText(level_2_data.easy.formula1.right);
                bubble_text_03.setText(level_2_data.easy.formula1.wrong4);
                
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
                bubble_text_01.setText(level_2_data.easy.formula1.wrong5);
                bubble_text_02.setText(level_2_data.easy.formula1.wrong6);
                bubble_text_03.setText(level_2_data.easy.formula1.right);
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
          chemical_formula_text_display.setText(level_2_data.easy.formula2.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.easy.formula2.right);
                bubble_text_02.setText(level_2_data.easy.formula2.wrong1);
                bubble_text_03.setText(level_2_data.easy.formula2.wrong2);
               
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
                bubble_text_01.setText(level_2_data.easy.formula2.wrong3);
                bubble_text_02.setText(level_2_data.easy.formula2.right);
                bubble_text_03.setText(level_2_data.easy.formula2.wrong4);
                
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
                bubble_text_01.setText(level_2_data.easy.formula2.wrong5);
                bubble_text_02.setText(level_2_data.easy.formula2.wrong6);
                bubble_text_03.setText(level_2_data.easy.formula2.right);
                
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
          chemical_formula_text_display.setText(level_2_data.easy.formula3.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.easy.formula3.right);
                bubble_text_02.setText(level_2_data.easy.formula3.wrong1);
                bubble_text_03.setText(level_2_data.easy.formula3.wrong2);
                
               // randomFormula = Math.floor(Math.random() * 3);
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
                bubble_text_01.setText(level_2_data.easy.formula3.wrong3);
                bubble_text_02.setText(level_2_data.easy.formula3.right);
                bubble_text_03.setText(level_2_data.easy.formula3.wrong4);
                
               // randomFormula = Math.floor(Math.random() * 3);
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
                bubble_text_01.setText(level_2_data.easy.formula3.wrong5);
                bubble_text_02.setText(level_2_data.easy.formula3.wrong6);
                bubble_text_03.setText(level_2_data.easy.formula3.right);2
               
                
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
          chemical_formula_text_display.setText(level_2_data.easy.formula4.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.easy.formula4.right);
                bubble_text_02.setText(level_2_data.easy.formula4.wrong1);
                bubble_text_03.setText(level_2_data.easy.formula4.wrong2);
               
                //randomFormula = Math.floor(Math.random() * 3);
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
            else if (randomFormula == 1){ 
                bubble_text_01.setText(level_2_data.easy.formula4.wrong3);
                bubble_text_02.setText(level_2_data.easy.formula4.right);
                bubble_text_03.setText(level_2_data.easy.formula4.wrong4);

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
            else if (randomFormula == 2){ 
                bubble_text_01.setText(level_2_data.easy.formula4.wrong5);
                bubble_text_02.setText(level_2_data.easy.formula4.wrong6);
                bubble_text_03.setText(level_2_data.easy.formula4.right);

             //   randomFormula = Math.floor(Math.random() * 3);
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
         
            chemical_formula_text_display.setText(level_2_data.easy.formula5.name);

            if (randomFormula == 0) { 
                bubble_text_01.setText(level_2_data.easy.formula5.right);
                bubble_text_02.setText(level_2_data.easy.formula5.wrong1);
                bubble_text_03.setText(level_2_data.easy.formula5.wrong2);

                 //randomFormula = Math.floor(Math.random() * 3);
                
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
                bubble_text_01.setText(level_2_data.easy.formula5.wrong3);
                bubble_text_02.setText(level_2_data.easy.formula5.right);
                bubble_text_03.setText(level_2_data.easy.formula5.wrong4);
                // randomFormula = Math.floor(Math.random() * 3);
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
                bubble_text_01.setText(level_2_data.easy.formula5.wrong5);
                bubble_text_02.setText(level_2_data.easy.formula5.wrong6);
                bubble_text_03.setText(level_2_data.easy.formula5.right);
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
    
game.state.add('mainState', mainState);

game.state.start('mainState');