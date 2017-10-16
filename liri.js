//============NPM Packages==============================
var request = require("request");
var nodeSpotifyApi = require("node-spotify-api");
var twitter = require("twitter");
//imported twitter keys module
var twitterKeys = require("./keys.js");
//==========================================================

// takes users command which should tell app which API to use
var userSelectsAPI = process.argv[2];