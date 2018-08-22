require("dotenv").config();
var request = require("request");
//Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
var fs = require("fs");
var command = process.argv[2];
var name = process.argv[3];

//command line
if (command == 'movie-this') {
    console.log(command);
    moviethis(name);

} else if (command == "spotify-this-song") {
    spotifythissong(name);
}



//function for the movie information-----------------------
function moviethis(movie_name) {
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("The movie's rating is: " + JSON.parse(response.body).imdbRating);
        }
    });
} // end of movie function----------------------



//function for the spotify songs information
function spotifythissong(name) {
    var spotify = require('node-spotify-api');
    var spotify = new spotify({
        id: 'e5f01dc665964a3e9070bbb6475fab6d',
        secret: '30e1cea38fcd47e7bb84073efca2d2eb'

    });

    spotify.search({ type: 'track', query: 'All the small things', artists: "artist" }, function (err, data) {
        if (err) {

            return console.log('there is an error' + err);
        }
        console.log(data);
        console.log(dat.tracks.items[0]);


    });//End of the spotify function
}


