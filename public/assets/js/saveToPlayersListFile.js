const fs = require('fs');
const mongoose = require('mongoose');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(playersFile) {
    //update or insert new player to the players.json file 
    fs.writeFile('public/data/players.json', JSON.stringify(playersFile), function(error) {
        if (error) {
            console.log("File not saved");
        }
    });
    //mongodb
    mongoose.connect('mongodb://localhost:27017/players');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        let playerSchema = mongoose.Schema({
            name: String,
            score: Number
        });
        // console.log(playersFile)

        let players = mongoose.model('players', playerSchema);
        players.remove({}, function(err) {
            console.log('collection removed')
        });

        // let play = new players(player);
        // console.log(play.name); // 'Kiya'
        // play.save(function(err, mes) {
        //     if (err) return console.error(err);
        //     console.log(mes);
        // });

        // players.find(function(err, pla) {
        //     if (err) return console.error(err);
        //     console.log(pla[0].name);
        // })

    });
}
module.exports = saveToPlayersListFile;