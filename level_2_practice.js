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
        
        //Load JSON
        game.load.text("chemicalFormula", "assets/game_data/level_2_data.json");
    },

    // function for adding pictures that are mostly static 
    create: function () {
       
        
        background = game.add.tileSprite(0, 0, width, height,'space_background_image');
        background_velocity = 3;
        
        // Handles the responsive design
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
         
        
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
        bubble_labels.inputEnableChildren = true;
        bubble_labels.enableBody = true;
        bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected
        bubble_01 = bubbles.create(width/4 - 220, 0, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        // Create variable to hold the font style crap
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        bubble_text_01 = game.add.text(0,0, "Bubble 01", style, bubble_labels);
        bubble_text_01.anchor.set(0.5);
        bubble_text_01.events.onInputDown.add(selectedBubble, this);
        
        bubble_02 = bubbles.create(bubble_01.x + 325, 0, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        bubble_text_02 = game.add.text(0,0, "Bubble 02", style, bubble_labels);
        bubble_text_02.anchor.set(0.5);
        bubble_text_02.events.onInputDown.add(selectedBubble, this);
        
        bubble_03 = bubbles.create(bubble_02.x + 325, 0, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
        var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        bubble_text_03 = game.add.text(0,0, "Bubble 03", style, bubble_labels);
        bubble_text_03.anchor.set(0.5);
        bubble_text_03.events.onInputDown.add(selectedBubble, this);
        
        
        var tween = game.add.tween(bubbles).to({x: 200, y: innerHeight - bubbles.height}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onLoop.add(descend,this);
        
        var tween = game.add.tween(bubble_labels).to({x: 200, y: innerHeight - bubbles.height}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onLoop.add(descend,this);
         /* for (var i = 0; i < 3; i++) {
            var bubble = bubbles.create(300 + (300 * i), 0, 'bubble_image');
            bubble.events.onInputDown.add(selectedBubble, this);
        } */
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
    
    input_bubble.kill();
    //input_bubble.y += 15;
    
}

function descend() {
    bubbles.y += 10;
}

game.state.add('mainState', mainState);

game.state.start('mainState');