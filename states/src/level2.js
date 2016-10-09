var level2 = function(game){
    
};

var space_background;
var background_velocity;

var balloons;
var balloon_velocity;

var player;

var spikes;

var score = 0;
var scoreText;

var testText;

level2.prototype = {
   
  
     
    create: function () {
        //A sprite on canvas
        //this.background = this.game.add.sprite(10, 10,'background');  
        //A sprite on canvas
        //this.background = this.game.add.sprite(1200, 220,'background');
        
        space_background = game.add.tileSprite(0, 0, 1750, 900, 'space_background');
        background_velocity = 2;
      
        // Create a group of balloons
        balloons = game.add.group();
        balloons.enableBody = true;
        balloons.physicsBodyType = Phaser.Physics.ARCADE;
        
        createBalloons();
        balloon_velocity = 4;
        
        // Create score text field and position it at the tp of screen
        scoreText = game.add.text(innerWidth * 0.05 , innerHeight * 0.05 ,'Score: ', {font: '56px Arial', fill : '#fff'});
        
        
        //  By default Phaser only starts 2 pointers (enough for 2 fingers at once)

        //  addPointer tells Phaser to add another pointer to Input, so here we are basically saying "allow up to 6 pointers + the mouse"

        //  Note: on iOS as soon as you use 6 fingers you'll active the minimise app gesture - and there's nothing we can do to stop that, sorry
       /*
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        */
        player = game.input.mouse.capture = true;

    },
    
    render: function () {
       
        // Just renders out the pointer data when you touch the canvas
        /*
        game.debug.pointer(game.input.mousePointer);
        game.debug.pointer(game.input.pointer1);
        game.debug.pointer(game.input.pointer2);
        game.debug.pointer(game.input.pointer3);
        game.debug.pointer(game.input.pointer4);
        game.debug.pointer(game.input.pointer5);
        game.debug.pointer(game.input.pointer6); 
        
        
        if (game.input.mousePointer ==) {
            testText = game.add.text(game.world.centerX, game.world.centerY, 'Test Successful',  {font: '10em', fill : '#fff'});
        }
        */
     this.game.debug.text("Left Button: " + this.game.input.activePointer.leftButton.isDown, 300, 300);
    },
    
    
    
    
    update: function () {
        
        space_background.tilePosition.y += background_velocity;
        
        if (balloons.y > innerHeight) {
            balloon_velocity = -balloon_velocity;
        }
       
          balloons.y += balloon_velocity;
    
        this.game.physics.arcade.overlap(balloons, player, collisionHandler, null, this);
        
    }
};

function createBalloons() {
     for (var y = 0; y < 1; y++) {
         for (var x = 0; x < 4; x++) {
             // Create balloons and set their x and y position relative to each other
             var balloon = balloons.create(x *  0.4, y * 0.4, 'balloon_image');
             balloon.anchor.setTo(0, 0);
         }
     }
    
    // Set position of the balloons group
    balloons.x = innerWidth;
    balloons.y = innerHeight / innerHeight;
    
    var tween = game.add.tween(balloons).to({x:200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    tween.onLoop.add(descend,this);
}

function descend() {
    balloons.y += 10;
}

function collisionHandler(balloon, player) {
 //  if (player.)
    
    score += 100;
}
this.game.state.add('GameState', GameState);
this.game.state.start('GameState');