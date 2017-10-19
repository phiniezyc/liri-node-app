//========NPM & Module Packages===========================

var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
//imported twitter keys module
var keys = require("./keys.js");


var twitterClient = new Twitter(keys.twitterKeys);

var spotifyClient = new Spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_Secret,
});

//==========Global Variables==============================

// takes users command which should tell app which API to use
var userSelectsAPI = process.argv[2];


//==========Global Functions==========================

function getTweets() {
    var params = {screen_name: 'UGA_FB_Thoughts', count: 20};

    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("HERE ARE YOUR TWEETS:");
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                //numbers each tweet. Adds 1 so numbering starts at 1 instead of 0--more human.
                console.log("Here is tweet " + [i + 1] + ":");
                console.log(' "' + tweets[i].text + '" ');
                console.log("This tweet was sent at:");
                console.log(tweets[i].created_at);
                console.log("==============================");
            }
        } else {
           console.log(error);
        }
     });
}

function getSpotifySongInfo() {
    //4th node argument is reserved for the song user wants to select
    var query = process.argv[3];
    if (query !== "") {
        //coule make this less repeating code by passing the song as a parameter?
        spotifyClient.search({type: 'track', query: query, limit: 1}, function (err, data) {
            if (!err) {
                console.log("=============Artist==Track==Album==PreviewURL=============================");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Track: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
            } else {
                console.log(err);
            }
        });
    } else {
        //need to make this specific for Ace of Base. For some reason it's not changing the query to reflect default song.
        query = 'The Sign';
        spotifyClient.search({type: 'track', query: query, limit: 1}, function (err, data) {
            if (!err) {
                console.log("=============Artist==Track==Album==PreviewURL=============================");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Track: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
            } else {
                console.log(err);
            }
        });
    }
}

function getMovieInfo() {
    var userMovieSearch = process.argv[3];
    if (userMovieSearch !== "") {
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + userMovieSearch + "&y=&plot=short&apikey=40e9cece";

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        request(queryUrl, function(error, response, body) {
            
              // If the request is successful
              if (!error && response.statusCode === 200) {
            
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Release Year: " + JSON.parse(body).Year);
              }
            });
    } else {
        //input default search here
        console.log("you searched for nothing!");
    }
}



//====conditional statements to select which API to use=====
if (userSelectsAPI === "my-tweets") {
    getTweets();

} else if (userSelectsAPI === "spotify-this-song") {
    getSpotifySongInfo();

} else if (userSelectsAPI === "movie-this") {
    //console.log("movie test worked");
    getMovieInfo();

} else if (userSelectsAPI === "do-what-it-says") {
    console.log("do what it says worked");

} else {
    console.log("You've entered an incorrect command. Please enter a correct command to proceed.");
}

