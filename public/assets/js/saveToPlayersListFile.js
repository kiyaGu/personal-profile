// const fs = require('fs');
const mongoose = require('mongoose');
const Player = require('./mongoosePlayerSchema');
const readPlayersList = require('./readPlayersList');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(currentPlayer) {

    mongoose.connect('mongodb://localhost:27017/players');
    let db = mongoose.connection;
    Player.find({}, function(err, players) {
        if (err) throw err;
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
                db.close();
            });
        }
        return readPlayersList();

    });
}
module.exports = saveToPlayersListFile;