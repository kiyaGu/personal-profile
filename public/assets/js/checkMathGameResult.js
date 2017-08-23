const formidable = require('express-formidable');
const recordNewPlayer = require('./recordNewPlayer');

function checkMathGameResult(playersFile, given, req, res, prevResult) {
    let index = 0
    for (; index < playersFile.length; index++) {
        if (playersFile[index].name.toLowerCase() === req.fields.playerName.toLowerCase()) {
            if (prevResult === Number(req.fields.answer)) {
                ++playersFile[index].score;
                //prepare response
                let successResponse = JSON.stringify({
                    verdict: "Well done, keep playing!!!",
                    inputGiven: given,
                    currentPlayer: playersFile[index]
                });
                res.send(successResponse);
                res.end();
            } else {
                if (playersFile[index].score > 0) {
                    --playersFile[index].score;
                } else {
                    playersFile[index].score = 0;
                }
                let ErrorResponse = JSON.stringify({
                    verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                    inputGiven: given,
                    currentPlayer: playersFile[index]
                });
                res.send(ErrorResponse);
                res.end();
            } //else
            break;
        } //outer if

    } //for loop
    if (index == playersFile.length) { //file not empty but new player
        playersFile = recordNewPlayer(playersFile, given, req, res, prevResult);
    }
    return playersFile;
}
module.exports = checkMathGameResult;