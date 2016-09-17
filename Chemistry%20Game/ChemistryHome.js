var game = new Phaser.Game(1750, 900, Phaser.AUTO, 'gameArea');




var GameState = {
    preload: function () {

        //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        
        this.load.image('background', 'PICTURE GOES HERE');  
    },
     
    create: function () {
        //A sprite on canvas
        this.background = this.game.add.sprite(10, 10,'background');  
        //A sprite on canvas
        this.background = this.game.add.sprite(1200, 220,'background');
        
    
    },
    
    update: function () {
        
        
    }
};


game.state.add('GameState', GameState);
game.state.start('GameState');