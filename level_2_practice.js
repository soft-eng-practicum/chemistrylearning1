// Variables for width and height
var width = 1365;
var height = 650;
// Instantiate Phaser game object
var game = new Phaser.Game(width, height, Phaser.Auto);

// Create variables
var background;
var background_velocity;

// Create varibale for group of bubbles
var bubbles;
var bubbles_velocity;

// Create variables for the individual bubbles
var bubble_01, bubble_02, bubble_03;

// Create variables for bubble labels
var bubble_text_01, bubble_text_02, bubble_text_03;

// Create variable for score and score text display
var score;
var score_text;

// Create player variable
var player;

// Create an array of the main functions of the game 
var mainState = {

    // Preload function will run  before the game starts and load images to memory
    preload: function () {
        game.load.image('space_background_image', "assets/space_background.jpg");
        game.load.image('bubble_image', "assets/bubble256.png");
    
    },

    // function for adding pictures that are mostly static 
    create: function () {
       
        
        background = game.add.tileSprite(0, 0, width, height,'space_background_image');
        background_velocity = 3;
        
        // Handles the responsive design
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true); 
        
        // Create group of bubbles
        bubbles = game.add.group();
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        bubbles.inputEnableChildren = true;
        bubbles.enableBody = true;
        bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        bubbles_velocity = 4;
        // Moves the image anchor to the middle, so it centers inside the game properly
        //bubbles.anchor.set(0.5);
        
        // Create 3 individual bubbles and allow them to be selected
        bubble_01 = bubbles.create(width, 0, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        //bubble_text_01
       
        bubble_02 = bubbles.create(bubble_01.x + 275, 0, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
    //  bubble_text_02
       
        bubble_03 = bubbles.create(bubble_02.x + 275, 0, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
    //  bubble_text_03
  
         /* for (var i = 0; i < 3; i++) {
            var bubble = bubbles.create(300 + (300 * i), 0, 'bubble_image');
            bubble.events.onInputDown.add(selectedBubble, this);
        } */
    },

    // Function holds information for things that move 24fps 
    // Checks for input from user and collisions between game characters
    update: function () {
        background.tilePosition.y += background_velocity;
        
       /* if (game.input.activePointer.isDown == true) {
           background_velocity = 25;
        } else {
            background_velocity = 2;
        } */
        
    },
    
    // Function holds information for things that move 50fps
    render: function () {
        
    }

};

function selectedBubble(input_bubble) {
  //input_bubble.kill();
  //input_bubble_text.kill();
    input_bubble.y += 15;
    
}

game.state.add('mainState', mainState);

game.state.start('mainState');