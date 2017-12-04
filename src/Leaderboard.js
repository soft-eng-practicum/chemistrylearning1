var leaderboardState = function (game) {


};

var leaderboard_background;
var leaderboard_background_velocity;

var leaderboard_data;
var leaderboard_text_array = [];

var leaderboard_title;

var home_screen_button;


leaderboardState.prototype = {

    //Main Phaser Create Function
    create: function () {

        //Creates the Background
        leaderboard_background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'leaderboard_background_image');
        leaderboard_background_velocity = 0.5;

        leaderboard_title = this.game.add.sprite(this.game.world.centerX - 250, 20, "High_Scores_Label");
        leaderboard_title.scale.setTo(1, 1);

        // Grab the data from the file and display it to the screen
        leaderboard_data = JSON.parse(this.game.cache.getText('leaderboard_JSON'));

        try {
            var phaserthis = this;
            
            $.ajax({            
             url: "https://api.mlab.com/api/1/databases/xenon/collections/leaderboard?apiKey=pG3dyrtnobnPgqHa7HvuUXA1mNADzxgM",             
            type: "GET",
            data: {
            },
                
            success: function( result ) {
            // Create text fields and put them into the leaderboard_text_array
            for (var i = 0; i < 10; i++) {

                leaderboard_text_array[i] = phaserthis.game.add.text(phaserthis.game.world.centerX, 125 + (60 * i), "", {
                    font: "53px Arial",
                    fill: "#ffffff",
                    align: "center"
                });

                leaderboard_text_array[i].anchor.setTo(0.5, 0);
                
                // Iterate through leaderboard_text_array and set the text with data from the JSON file
                leaderboard_text_array[i].setText(result[i].name + "  " + result[i].high_score);
            }
                 
            }
        });
            
            

        } catch (err) {
            console.log("This is the problem --> " + err.name);
        }
        

        backButton = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY + 240, "backButton", this.returnHome, this);
        backButton.scale.setTo(1, 1);

        console.log("This is the first value in JSON file: " + leaderboard_data.leaderboard[0].name +
            " " + leaderboard_data.leaderboard[0].high_score);

        console.log("This is the length of the array in the JSON file: " +
            leaderboard_data.leaderboard.length);
    },

    update: function () {

        leaderboard_background.tilePosition.y += leaderboard_background_velocity;
    },

    returnHome: function () {
        this.game.state.start("GameTitle");
    },

};