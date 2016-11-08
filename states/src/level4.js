var level4 = function(game){
    
};

var levelBackground;
var countDownLabel;
var scoreLabel;
var instructions;
var timer;
var cursors;

var text1, text2, text3;
var a1, a2, a3;
var score;

var pause_label;
var choiceLabel;
var menu;
var resumeButton;
var quitButton;
var pauseW = 30;
var pauseH = 600;

var phaserJSON;
var randomElement;
var randomFormula;
var correct;
var wrong;

var blackHole;
var asteroidGroup;
var cursors;
var asteroids;


level4.prototype = {  
   
    //Main Phaser Create Function
  	create: function(){ 
		

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

   this.game.stage.backgroundColor = '#2d2d2d';

   asteroidGroup = this.game.add.group();
   
   asteroidGroup.createMultiple(250, "asteroid", 0, false);

    blackHole = this.game.add.sprite(300, 550, 'spaceCraft');
	

    this.game.physics.arcade.gravity.y = 400;

    //  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)
    this.game.physics.arcade.enable(this.game.world, true);

    blackHole.body.allowGravity = 0;
    blackHole.body.immovable = true;

    cursors = this.game.input.keyboard.createCursorKeys();

    this.game.time.events.loop(150, this.fire, this);

    this.game.add.text(16, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });

},
	
	fire: function() {

    asteroids = asteroidGroup.getFirstExists(false);

    if (asteroids)
    {
       asteroids.frame = this.game.rnd.integerInRange(0,6);
       asteroids.exists = true;
       asteroids.reset(this.game.world.randomX, 0);

       asteroids.body.bounce.y = 0.8;
    }

},

reflect: function(a, asteroids) {

    if (asteroids.y > (blackHole.y + 5))
    {
        return true;
    }
    else
    {
        asteroids.body.velocity.x = blackHole.body.velocity.x;
        asteroids.body.velocity.y *= -(asteroids.body.bounce.y);

        return false;
    }

},

update: function() {

    this.game.physics.arcade.collide(blackHole, asteroidGroup, null,  this.reflect, this);

    blackHole.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        blackHole.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        blackHole.body.velocity.x = 200;
    }

   asteroidGroup.forEachAlive(this.checkBounds, this);

},

checkBounds: function(asteroids) {

    if (asteroids.y > 600)
    {
        asteroids.kill();
    }

}


		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
};