const formidable = require('express-formidable');
//player constructor
var Players = function(name, score) {
    this.name = name;
    this.score = score;
}

function recordNewPlayer(playersFile, given, req, res, prevResult) {
    currentPlayer = new Players(req.fields.playerName, 0);
    if (prevResult === Number(req.fields.answer)) {
        ++currentPlayer.score;
        let successResponse = JSON.stringify({
            verdict: "Well done, keep playing!!!",
            inputGiven: given,
            currentPlayer: currentPlayer
        });
        res.send(successResponse);
    } else {
        let ErrorResponse = JSON.stringify({
            verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
            inputGiven: given,
            currentPlayer: currentPlayer
        });
        res.send(ErrorResponse);
    }
    playersFile.push(currentPlayer);
    return playersFile;
}

module.exports = recordNewPlayer;