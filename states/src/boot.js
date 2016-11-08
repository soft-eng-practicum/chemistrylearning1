var bootState = function(game){
    
};


bootState.prototype = {
    
    //Main Phaser Create Function
  	create: function(){
        
        //Sets view for Desktop
        if (this.game.device.desktop){                  
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;        
            this.scale.minWidth = gameWidth/2;            
            this.scale.minHeight = gameHeight/2;            
            this.scale.maxWidth = gameWidth;            
            this.scale.maxHeight = gameHeight;            
            this.scale.pageAlignHorizontally = true;        
            this.scale.pageAlignVertically = true;          
            }        
        
        //Sets view for mobile
        else{           
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;            
            this.scale.minWidth = gameWidth/2;         
            this.scale.minHeight = gameHeight/2;      
            this.scale.maxWidth = gameWidth;           
            this.scale.maxHeight = gameHeight; 
            this.scale.pageAlignHorizontally = true;            
            this.scale.pageAlignVertically = true;   
            this.scale.forceOrientation(true, false);     
        }

        //Provides Physics for the Game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Starts Preload
		this.game.state.start("Preload");
	}
};