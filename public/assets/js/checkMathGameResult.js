const formidable = require('express-formidable');
const recordNewPlayer = require('./recordNewPlayer');
const saveToPlayersListFile = require('./saveToPlayersListFile');

function checkMathGameResult(playersFile, given, req, res, prevResult) {
    let index = 0,
        player;
    for (; index < playersFile.length; index++) {
        if (playersFile[index].name.toLowerCase() === req.fields.playerName.toLowerCase()) {
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
        player = recordNewPlayer(given, req, res, prevResult);
    }
}
module.exports = checkMathGameResult;