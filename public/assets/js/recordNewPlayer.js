const formidable = require('express-formidable');
const saveToPlayersListFile = require('./saveToPlayersListFile');
//player constructor
var Players = function(name, score, cookieId) {
    this.name = name;
    this.score = score;
    this.cookieId = cookieId
}

function recordNewPlayer(playersFile, given, req, res, prevResult) {
    // let playersFile;
    currentPlayer = new Players(req.fields.playerName, 0, req.cookies.currentPlayer);

    if (prevResult === Number(req.fields.answer)) {
        ++currentPlayer.score;
        playersFile.push(currentPlayer);
        let successResponse = JSON.stringify({
            verdict: "Well done, keep playing!!!",
            inputGiven: given,
            playersCollection: playersFile
        });
        saveToPlayersListFile(currentPlayer);
        res.send(successResponse);
    } else {
        playersFile.push(currentPlayer);
        let ErrorResponse = JSON.stringify({
            verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
            inputGiven: given,
            playersCollection: playersFile
        });
        saveToPlayersListFile(currentPlayer);
        res.send(ErrorResponse);
    }
}

module.exports = recordNewPlayer;