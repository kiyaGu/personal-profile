//reset puzzel
let resetGame = function() {
    const easierPuzzel = require('./easierPuzzel');
    const harderPuzzel = require('./harderPuzzel');
    if (currentGame == "easierPuzzel") {
        //recreate the game
        easierPuzzel();
    } else {
        harderPuzzel();
    }
    //remove the timer
    $('#game-timer').countdown('destroy');
    //remove the message for losing the game
    setTimeout(() => {
        $('#game-timer p').css('display', 'none');
    }, 7000);
}
module.exports = resetGame;