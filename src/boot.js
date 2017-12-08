var bootState = function(game){
    
};

var firstRunLandscape;
var switchScreen;

bootState.prototype = {
    preload: function(){
        this.game.load.image("orientation","assets/orientation.png");
        this.game.add.plugin(PhaserInput.Plugin);
    },
    
    //Main Phaser Create Function
  	create: function(){
        
        //Sets view for Desktop
        if (this.game.device.desktop){                  
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;        
            this.scale.minWidth = width/2;            
            this.scale.minHeight = height/2;            
            this.scale.maxWidth = width;            
            this.scale.maxHeight = height;            
            this.scale.pageAlignHorizontally = true;        
            this.scale.pageAlignVertically = true;  
            }        
        
        //Sets view for mobile
        else{        
            firstRunLandscape = this.game.scale.isGameLandscape;
            
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         
              
            this.scale.minWidth = width/2;         
            this.scale.minHeight = height/2;      
            this.scale.maxWidth = width;           
            this.scale.maxHeight = height; 
            this.scale.pageAlignHorizontally = true;          
            this.scale.pageAlignVertically = true;  
            
            this.scale.forceOrientation(true, false); 
            
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);  
        }

        //Provides Physics for the Game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Starts Preload
		this.game.state.start("Preload");
        
         
	},
    
    enterIncorrectOrientation: function(){
     	if(!this.game.device.desktop){
     		document.getElementById("gameDiv").style.display="block";
     	}
	},
	
	leaveIncorrectOrientation: function(){
		if(!game.device.desktop){
    
            if(firstRunLandscape){
                var gameRatio = window.innerWidth/window.innerHeight;		
                this.game.width = Math.ceil(640*gameRatio);
                this.game.height = 600;
                this.game.renderer.resize(game.width,game.height);
                    }
            
			document.getElementById("gameDiv").style.display="none";
		}
	}

};