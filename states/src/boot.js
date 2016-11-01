var bootState = function(game){
    
};


bootState.prototype = {
    
  	create: function(){
        
        if (this.game.device.desktop){                  
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;        
            this.scale.minWidth = gameWidth/2;            
            this.scale.minHeight = gameHeight/2;            
            this.scale.maxWidth = gameWidth;            
            this.scale.maxHeight = gameHeight;            
            this.scale.pageAlignHorizontally = true;        
            this.scale.pageAlignVertically = true;          
            }        
        
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

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start("Preload");
	}
    
};