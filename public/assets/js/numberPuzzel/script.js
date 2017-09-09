const easierPuzzel = require('./easierPuzzel');
const harderPuzzel = require('./harderPuzzel');
const drawNumberImg = require('./drawImage');
const generateRandomNumber = require('./generateRandomNumbers');
const getMousePos = require('./getMousePosition');
const resetGame = require('./resetThePuzzel');
const makeMove = require('./makeMove');
const gameTimer = require('./gameTimer');
const PuzzelEntry  = require('./puzzelEntry');
const PuzzelBoardPosition = require('./puzzelBoardPosition');
global.currentGame, global.canvasContext;

//change game type
document.getElementById('make-it-harder').addEventListener('click', (event) => {
    let harderPuzzelContainer = document.querySelector('#harder-puzzel-container');
    let easierPuzzelContainer = document.querySelector('#easy-puzzel-container');
    let switchGame = document.querySelector('#make-it-harder').innerHTML;
    if (switchGame.trim() == "Make It Harder") {
        harderPuzzelContainer.style.display = 'block';
        easierPuzzelContainer.style.display = 'none';
        harderPuzzel();
        $('#game-timer').countdown('destroy');
        document.querySelector('#make-it-harder').innerHTML = "Make It Easier";
    } else {
        harderPuzzelContainer.style.display = 'none';
        easierPuzzelContainer.style.display = 'block';
        easierPuzzel();
        $('#game-timer').countdown('destroy');
        document.querySelector('#make-it-harder').innerHTML = "Make It Harder";
    }

});
//reset the game
document.getElementById('reset').addEventListener('click', (event) => {
    resetGame();
});
easierPuzzel();
