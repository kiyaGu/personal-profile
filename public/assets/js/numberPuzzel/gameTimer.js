let gameTimer = function(ceiling, callback) {
    //game timer
    shortly = new Date();
    shortly.setSeconds(shortly.getSeconds() + ceiling);
    $('#game-timer').countdown({
        until: shortly,
        expiryText: '<p id="expiry-text" class="animated slideInRight">Oops, you LOST!!!</p>',
        onExpiry: callback,
        format: 'MS'//minute and seconds
    });
}
module.exports = gameTimer;
