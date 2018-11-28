var signUpState = function (game) {};

var signupBackground;
var signupTitle;
var createButton;
var cancelButton;
var firstName;
var lastName;
var email;
var username;
var password;
var userCreated;
var userNotcreated;

signUpState.prototype = {

    //Create Function
    create: function () {

        //Creates Background
        signupBackground = this.game.add.sprite(0, 0, "titleBackground");
        signupBackground.scale.setTo(1, 1.35);

        //Displays a message if the user is created successfully.
        userCreated = this.game.add.text(this.game.world.centerX - 200, 550, "User Successfully Created.", {
            font: "30px Courier",
            fill: "#ffffff",
            align: "center"
        });
        userCreated.visible = false;

        //Displays a message if the user is created unsuccessfully.
        userNotcreated = this.game.add.text(this.game.world.centerX - 250, 550, "GGC Email Address Required", {
            font: "30px Courier",
            fill: "#ffffff",
            align: "center"
        });
        userNotcreated.visible = false;


        signupTitle = this.game.add.text(this.game.world.centerX - 290, 300, "Complete The Fields To Create A New User", {
            font: "30px Courier",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 600,
            align: "center"
        });
        signupTitle.scale.setTo(1, 1);

        //Create the email field
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

        //Create the password field
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
        cancelButton = this.game.add.button(80, 690, "Gameover_Home", this.returntoMain, this);
        cancelButton.scale.setTo(1, 1);

        //Create the Submit button
        submitButton = this.game.add.button(300, 684, "submitButton", this.createPlayer, this);
        submitButton.scale.setTo(.23, .23);
    },

    //Function: Add a new player to the database
    createPlayer: function () {
        var newEmail = this.email.value;

        //Email must be a GGC email address
        if (newEmail.length > 0 && newEmail.includes("@ggc.edu")) {
            $.ajax({
                url: "https://api.mlab.com/api/1/databases/xenon/collections/login?apiKey=pG3dyrtnobnPgqHa7HvuUXA1mNADzxgM",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "email": this.email.value,
                    "password": game.sha1(this.password.value)
                }),
                success: function (result) {
                    console.log("User created successfully!");
                    userCreated.visible = true;
                    userNotcreated.visible = false;
                    //Reset the text fields when the name and password are entered
                }
            });
            this.email.resetText();
            this.password.resetText();
            //this.game.state.start("GameTitle");
        } else {
            console.log("User not created.")
            userNotcreated.visible = true;
            //Reset the text fields when the name and password are entered
            this.email.resetText();
            this.password.resetText();
        }
    },

    //Function: Cancel()
    returntoMain: function () {
        this.game.state.start("GameTitle");
    },
};