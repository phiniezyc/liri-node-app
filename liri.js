//============NPM Packages==============================
var request = require("request");
var nodeSpotifyApi = require("node-spotify-api");
var twitter = require("twitter");
//imported twitter keys module
var twitterKeys = require("./keys.js");
//==========================================================

// takes users command which should tell app which API to use
var userSelectsAPI = process.argv[2];


//====conditional statements to select which API to use=====
if (userSelectsAPI === "my-tweets") {
    console.log("tweet test worked");
} else if (userSelectsAPI === "spotify-this-song") {
    console.log("spotify api test worked");
} else if (userSelectsAPI === "movie-this") {
    console.log("movie test worked");
} else if (userSelectsAPI === "do-what-it-says") {
    console.log("do what it says worked");
} else {
    console.log("You've entered an incorrect command. Please enter a correct command to proceed.");
}