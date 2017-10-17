//============NPM Packages==============================
var request = require("request");
var nodeSpotifyApi = require("node-spotify-api");
var Twitter = require("twitter");
//imported twitter keys module
var keys = require("./keys.js");


var client = new Twitter(keys.twitterKeys);

//==========================================================

// takes users command which should tell app which API to use
var userSelectsAPI = process.argv[2];



//==========Global Functions==========================

function getTweets() {
    var params = { screen_name: 'UGA_FB_Thoughts', count: 2 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("HERE ARE YOUR TWEETS:");
            console.log(tweets);
        } else {
           console.log("Sorry, there was an error");
        }
     });
}


//====conditional statements to select which API to use=====
if (userSelectsAPI === "my-tweets") {
    getTweets();

} else if (userSelectsAPI === "spotify-this-song") {
    console.log("spotify api test worked");

} else if (userSelectsAPI === "movie-this") {
    console.log("movie test worked");

} else if (userSelectsAPI === "do-what-it-says") {
    console.log("do what it says worked");

} else {
    console.log("You've entered an incorrect command. Please enter a correct command to proceed.");
}

