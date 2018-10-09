var statsState = function (game) {


};

var stats_background;
var stats_background_velocity;

var stats_data;
var stats_text_array = [];

var stats_title;

var home_screen_button;


statsState.prototype = {

    //Main Phaser Create Function
    create: function () {

        //Creates the Background
        stats_background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'leaderboard_background_image');
        stats_background_velocity = 0.5;

        stats_title = this.game.add.sprite(this.game.world.centerX - 250, 20, "High_Scores_Label");
        stats_title.scale.setTo(1, 1);


        try {
            var phaserthis = this;
            
            $.ajax({            
             url: 'https://api.mlab.com/api/1/databases/xenon/collections/login?s={"level": 1}&l=10&apiKey=pG3dyrtnobnPgqHa7HvuUXA1mNADzxgM',    
                
            type: "GET",
            data: {},
            contentType: "application/json",
                
            success: function( result ) {
            // Create text fields and put them into the leaderboard_text_array
            for (var i = 0; i < 100; i++) {

                stats_text_array[i] = phaserthis.game.add.text(phaserthis.game.world.centerX, 125 + (60 * i), "", {
                    font: "53px Arial",
                    fill: "#ffffff",
                    align: "center"
                });

                stats_text_array[i].anchor.setTo(0.5, 0);
                
                // Iterate through stats_text_array and set the text with data from the JSON file
                stats_text_array[i].setText(result[i].email + "  " + result[i].password);
            }
                 
            }
        });            
            

        } catch (err) {
            console.log("This is the problem --> " + err.name);
        }        

        backButton = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY + 240, "backButton", this.returnHome, this);
        backButton.scale.setTo(1, 1);

        console.log("This is the first value in JSON file: " + stats_data.login[0].email +
            " " + stats_data.stats[0].password);

        console.log("This is the length of the array in the JSON file: " +
            stats_data.stats.length);
    },

    update: function () {

        stats_background.tilePosition.y += stats_background_velocity;
    },

    returnHome: function () {
        this.game.state.start("GameTitle");
    },

};