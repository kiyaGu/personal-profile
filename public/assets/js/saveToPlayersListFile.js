// const fs = require('fs');
const mongoose = require('mongoose');
const Player = require('./mongoosePlayerSchema');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(currentPlayer) {
    //update or insert new player to the players.json file
    //through fs.writeFile 
    // fs.writeFile('public/data/players.json', JSON.stringify(playersFile), function(error) {
    //     if (error) {
    //         console.log("File not saved");
    //     }
    // });
    //through mongodb

    mongoose.connect('mongodb://localhost:27017/players');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
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

            });
        }
        return Player.find({}, function(err, players) {
            if (err) console.log('error: can\'t find the collection');
            mongoose.connection.close();
            return players
        })

    });
}
module.exports = saveToPlayersListFile;