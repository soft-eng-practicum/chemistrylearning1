var signUpState = function (game) {

};

var signupBackground;
var signupTitle;
var createButton;
var cancelButton;
var firstName;
var lastName;
var email;
var username;
var password;

signUpState.prototype = {

    //Create Function
    create: function () {

        //Creates Background
        signupBackground = this.game.add.sprite(0, 0, "titleBackground");
        signupBackground.scale.setTo(1, 1.35);

        signupTitle = this.game.add.text(this.game.world.centerX - 290, 300, "Complete The Fields To Create A New User", {
            font: "30px Courier",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 600,
            align: "center"
        });
        signupTitle.scale.setTo(1, 1);

        //Create input text boxes
        firstName = game.add.inputField(this.game.world.centerX-100, 400, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 150, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'First Name', type: PhaserInput.InputType.name});
        
        lastName = game.add.inputField(this.game.world.centerX-100, 450, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 150, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'Last Name', type: PhaserInput.InputType.name});
        
        email = game.add.inputField(this.game.world.centerX-100, 500, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 150, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'GGC Email', type: PhaserInput.InputType.name});
        
        username = game.add.inputField(this.game.world.centerX-100, 550, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 150, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'Username', type: PhaserInput.InputType.name});
        
        password = game.add.inputField(this.game.world.centerX-100, 600, {font: '18px Arial', fill: '#212121', fontWeight: 'bold', width: 150, padding: 8, borderWidth: 1, borderColor:'#FFFF', borderRadius: 6, placeHolder: 'Password', type: PhaserInput.InputType.password}); 

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