const formidable = require('express-formidable');
const recordNewPlayer = require('./recordNewPlayer');
const saveToPlayersListFile = require('./saveToPlayersListFile');

function checkMathGameResult(playersFile, given, req, res, prevResult) {
    let index = 0,
        player;
    for (; index < playersFile.length; index++) {
        let currentPlayerName = req.fields.playerName.toLowerCase() + "-" + String(req.cookies.currentPlayer).substring(0, 3);
        if (playersFile[index].name.toLowerCase() === currentPlayerName &&
            playersFile[index].cookieId == req.cookies.currentPlayer.trim()) {
            player = playersFile[index];
            if (prevResult === Number(req.fields.answer)) {
                ++player.score;
                //prepare response
                let successResponse = JSON.stringify({
                    verdict: "Well done, keep playing!!!",
                    inputGiven: given,
                    playersCollection: playersFile
                });
                saveToPlayersListFile(player);
                res.send(successResponse);
                res.end();
            } else {
                if (player.score > 0) {
                    --player.score;
                } else {
                    player.score = 0;
                }
                let ErrorResponse = JSON.stringify({
                    verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                    inputGiven: given,
                    playersCollection: playersFile
                });
                saveToPlayersListFile(player);
                res.send(ErrorResponse);
                res.end();
            } //else
            break;
        } //outer if
    } //for loop
    if (index == playersFile.length) { //file not empty but new player
        player = recordNewPlayer(playersFile, given, req, res, prevResult);
    }
}
module.exports = checkMathGameResult;