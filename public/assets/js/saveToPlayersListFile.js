// const fs = require('fs');
const mongoose = require('mongoose');
const Player = require('./mongoosePlayerSchema');
const readPlayersList = require('./readPlayersList');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(currentPlayer) {
    mongoose.connect("mongodb://heroku_fntsrbx3:a6efqbtc5vddnicek2s8m2s3nj@ds127892.mlab.com:27892/heroku_fntsrbx3");
    // let db = mongoose.connection;
    readPlayersList().then((players) => {
        let i = 0;
        for (; i < players.length; i++) {
            if (players[i].name.toLowerCase() === currentPlayer.name.toLowerCase()) {
                players[i].score = currentPlayer.score;
                players[i].save((err) => {
                    if (err) console.log("can\'t not update the record");
                })
                break;
            }
        }
        if (i == players.length || players.length < 1) {
            currentPlayer = new Player(currentPlayer);
            currentPlayer.save((err) => {
                if (err) console.log("can\'t record new player");
                // db.close();
            });
        }
        return Player.find({}, function(err, playersCollection) {
            if (err) return console.error(err);
            //close the connection
            // db.close();
            return playersCollection;
        }).sort({ score: -1 });
    })

}
module.exports = saveToPlayersListFile;