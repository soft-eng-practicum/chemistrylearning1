var bootState = function(game){
    
};


bootState.prototype = {
    
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
        //Have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
		this.game.state.start("Preload");
	}
};