// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const mongoose = require('mongoose');
const Player = require('./mongoosePlayerSchema');
//an object to hold the generated operators, operand and the calculated result
function readPlayersList() {


    mongoose.connect('mongodb://localhost:27017/players');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    return Player.find(function(err, playersCollection) {
            if (err) return console.error(err);
            return playersCollection;
        })
        //through using fs.readFileAsync with bluebired
        // var filePath = 'public/data/players.json';
        // return fs.readFileAsync(filePath)
        //     .then((data) => {
        //         playersFile = JSON.parse(data);
        //         //sort the returned file based on the players score descendingly
        //         playersFile.sort(function(a, b) {
        //             return b.score - a.score;
        //         });
        //         //display only the top 10 players
        //         //if it is less than 10 no need to filter the top 10
        //         if (playersFile.length > 10) {
        //             let topTenPlayers = [];
        //             for (let i = 0; i < 10; i++) {
        //                 topTenPlayers.push(playersFile[i]);
        //             }
        //             return topTenPlayers;
        //         } else {
        //             return playersFile;
        //         }
        //     });

}
module.exports = readPlayersList;