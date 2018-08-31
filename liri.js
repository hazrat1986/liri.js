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
} else if (command == "my-tweets") {
    myTweets();
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


// my-tweets function
function myTweets() {

    var Twitter = require('twitter');
 
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    var params = {screen_name: 'Donald J. Trump'};

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function (err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function (err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('terminal.log', ('=============== LOG ENTRY END ===============\r\n \r\n'), function (err) {
                if (err) throw err;
            });
        }
    });
} // end myTweets function



//function for the spotify songs information
function spotifythissong(name) {
    var spotify = require('node-spotify-api');
    var spotify = new spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: 'All the small things', artists: "artist" }, function (err, data) {
        if (err) {

            return console.log('there is an error' + err);
        }
        console.log(data);
        console.log(dat.tracks.items[0]);


    });//End of the spotify function
}


