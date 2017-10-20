//========NPM & Module Packages===========================
//imported twitter keys module
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

var twitterClient = new Twitter(keys.twitterKeys);

var spotifyClient = new Spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_Secret,
});

//==========Global Functions==========================

function getTweets() {
    var params = { screen_name: 'UGA_FB_Thoughts', count: 20 };

    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
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
    var defaultSpotifySong = 'Ace of Base';
    //4th node argument is reserved for the song user wants to select
    var query = (process.argv[3] || defaultSpotifySong);
    //could make this less repeating code by passing the song as a parameter?
    spotifyClient.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
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

function getMovieInfo() {
    var defaultMovie = 'Mr. Nobody';
    var userMovieSearch = (process.argv[3] || defaultMovie);
    //if (userMovieSearch !== "") {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovieSearch + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            //uncomment JSON.parse(body) below to get other information from the API
            //console.log(JSON.parse(body));
        } else {
            console.log(error);
        }
    });
}

// reads txt file to get command to run 
function readTxtFileForCommand() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            console.log(data);
            // takes the text file and splits the info from comma to comma into different positions in array
            var fileTextSplitIntoArr = data.split(",");
            console.log(fileTextSplitIntoArr);

             // converts the text file into format for query.
            var textFileArg1 = fileTextSplitIntoArr[0];
            var textFileArg2 = fileTextSplitIntoArr[1];
            
            // Grabs the 2nd index (fileTextSplitIntoArr[1]) position to use for query search 
            var query = textFileArg2;
            //changed code to fix default issue which means I had to repeat this code here: BAD!
            spotifyClient.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
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
            console.log(error);
        }
    });
}

function startApp() {
    // takes users command which tells app which API to use
    var userSelectsAPI = process.argv[2];

    //====conditional statements to select which API to use=====
    if (userSelectsAPI === "my-tweets") {
        getTweets();

    } else if (userSelectsAPI === "spotify-this-song") {
        getSpotifySongInfo();

    } else if (userSelectsAPI === "movie-this") {
        getMovieInfo();

    } else if (userSelectsAPI === "do-what-it-says") {
        readTxtFileForCommand();

    } else {
        console.log("You've entered an incorrect command. Please enter a correct command to proceed.");
    }
}

//=========App=Mechanics=====================================
startApp();

