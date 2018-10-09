var loginState = function (game) {

};

var loginBackground;
var loginTitle;
var submitButton;
var email;
var password;
var statsButton;
var loginSuccess;   

loginState.prototype = {
    
    create: function () {
            

        //Creates Background
        loginBackground = this.game.add.sprite(0, 0, "titleBackground");
        loginBackground.scale.setTo(1, 1.35);
        
        loginSuccess = this.game.add.text(this.game.world.centerX-150, 550, "Login Successful", {font: "30px Courier", fill: "#ffffff", align: "center"});
        loginSuccess.visible = false;

        loginTitle = this.game.add.text(this.game.world.centerX - 290, 300, "Complete The Fields To Login", {
            font: "30px Courier",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 600,
            align: "center"
        });
        loginTitle.scale.setTo(1, 1);

        this.email = game.add.inputField(this.game.world.centerX - 150, 400, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#FFFF',
            borderRadius: 6,
            placeHolder: 'GGC Email',
            type: PhaserInput.InputType.email
        });

        this.password = game.add.inputField(this.game.world.centerX - 150, 450, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#FFFF',
            borderRadius: 6,
            placeHolder: 'Password',
            type: PhaserInput.InputType.password
        });

        //Create the Cancel button
        submitButton = this.game.add.button(300, 698, "submitButton", this.playerLogin, this);
        submitButton.scale.setTo(.23, .23);

        //Create the Cancel button
        cancelButton = this.game.add.button(80, 700, "Gameover_Home", this.returntoMain, this);
        cancelButton.scale.setTo(1, 1);
    },

    //Function: Cancel()
    returntoMain: function () {
        this.game.state.start("GameTitle");
    },

    //Check player credentials against the database. 
    playerLogin: function () {
        var that = this;
        $.ajax({
            url: "https://api.mlab.com/api/1/databases/xenon/collections/login?q={\"email\":\"" + this.email.value + "\", \"password\":\"" + game.sha1(this.password.value) + "\"}&apiKey=pG3dyrtnobnPgqHa7HvuUXA1mNADzxgM",

            type: "GET",
            data: {},
            contentType: "application/json",

            success: function (result) {  
                console.log(result);
                
                if(result.length > 0 && that.email.value===result[0].email)
                    {
                        console.log("I'm logged in");
                        loginSuccess.visible = true;                 
                        that.game.state.start("GameTitle");    
                        that.game.loggedIn = true; 
                    }
                else{that.game.loggedIn = false;}
            }
        });
    },
    
    onComplete: function() { 
        //Starts Game Title
        this.game.state.start("GameTitle");
    },

};