const formidable = require('express-formidable');
const saveToPlayersListFile = require('./saveToPlayersListFile');
//player constructor
var Players = function(name, score) {
    this.name = name;
    this.score = score;
}

function recordNewPlayer(given, req, res, prevResult) {
    let playersFile;
    currentPlayer = new Players(req.fields.playerName, 0);
    if (prevResult === Number(req.fields.answer)) {

        ++currentPlayer.score;
        let playersFile = saveToPlayersListFile(currentPlayer);
        let successResponse = JSON.stringify({
            verdict: "Well done, keep playing!!!",
            inputGiven: given,
            playersCollection: playersFile
        });

        res.send(successResponse);
    } else {
        playersFile = saveToPlayersListFile(currentPlayer);
        let ErrorResponse = JSON.stringify({
            verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
            inputGiven: given,
            playersCollection: playersFile
        });

        res.send(ErrorResponse);
    }
    // return currentPlayer;
}

module.exports = recordNewPlayer;