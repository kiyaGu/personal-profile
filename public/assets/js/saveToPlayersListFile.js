const Player = require('./mongoosePlayerSchema');
const readPlayersCollection = require('./readPlayersCollection');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(currentPlayer) {
    readPlayersCollection()
        .then((players) => {
            let i = 0;
            for (; i < players.length; i++) {
                if (players[i].name.toLowerCase() === currentPlayer.name.toLowerCase() &&
                    players[i].cookieId === currentPlayer.cookieId) {
                    players[i].score = currentPlayer.score;
                    players[i].save((err) => {
                        if (err)
                            console.log("can\'t not update the record");
                    })
                    break;
                }
            }
            if (i == players.length || players.length < 1) {
                currentPlayer = new Player(currentPlayer);
                currentPlayer.save((err) => {
                    if (err)
                        console.log("can\'t record new player");
                });
            }
            return Player.find({}, function(err, playersCollection) {
                if (err)
                    return err;
                return playersCollection;
            }).sort({ score: -1 });
        })
}
module.exports = saveToPlayersListFile;