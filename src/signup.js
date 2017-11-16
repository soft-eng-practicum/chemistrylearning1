var signUpState = function(game) {

};

var signupBackground;
var signupTitle;
var createButton;
var cancelButton;
var input; 

signUpState.prototype = {

        //Create Function
        create: function () {

            //Creates Background
            signupBackground = this.game.add.sprite(0, 0, "titleBackground");
            signupBackground.scale.setTo(1, 1.35);

            signupTitle = this.game.add.text(this.game.world.centerX-290, 300, "Complete The Fields To Create A New User", {font: "30px Courier", fill: "#ffffff", wordWrap: true, wordWrapWidth: 600, align: "center"});
            signupTitle.scale.setTo(1, 1);     

            //Create the Create button
            createButton = this.game.add.button(80, 700, "Gameover_Home", this.returntoMain, this);
            createButton.scale.setTo(1, 1);

            //Create the Cancel button
            cancelButton = this.game.add.button(300, 700, "play", this.returntoMain, this);
            cancelButton.scale.setTo(.9, .9);
            
            
        }, 


            //Function: CreatePayer() to create a new player profile
            //  createPlayer: function()
            //{
            //Create new player in the database.
            //this.game.state.start("GameTitle");
            //}

            //Function: Cancel()
            returntoMain: function () {
                this.game.state.start("GameTitle");
            }
        };