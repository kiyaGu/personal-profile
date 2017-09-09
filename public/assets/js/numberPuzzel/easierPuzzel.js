const drawNumberImg = require('./drawImage');
const getMousePos = require('./getMousePosition');
const resetGame = require('./resetThePuzzel');
const makeMove = require('./makeMove');
const gameTimer = require('./gameTimer');
const checkGameResult = require('./checkGameResult');
const displayMessage = require('./displayMessage');
const createThePositionObjects = require('./positionObjects');
const createPositionNumberEntries = require('./positionNumberEntries');
const mixThePuzzel = require('./mixThePuzzel');
//easier puzzel
let easierPuzzel = function() {
    currentGame = "easierPuzzel";
    //to hold the randomely generated number for the mixing the puzzel
    this.index = [];
    mixThePuzzel(9);
    //create the positions to hold the numbers
    this.positions = [];
    //x and y pixel/coordinate positions to construct the images from
    let x = [0, 101, 202];
    let y = [0, 81, 162]
        //(x, y, availablity, posNumber, currentPlaceHolder)
    createThePositionObjects(x, y, index);
    //creating the numbers with their currentLocation
    this.puzzelEntryNumbers = [];
    createPositionNumberEntries(9, index);
    let easyGameCanvas = document.getElementById('easy-puzzel');
    canvasContext = easyGameCanvas.getContext('2d');
    //for each position in the canvas draw the numbers
    puzzelEntryNumbers.forEach((element) => {
            drawNumberImg(element.position.x, element.position.y, element.puzzelNumber);
        })
        // listen for mouse click with in the canvas area
    easyGameCanvas.addEventListener('click', (event) => {
        event.preventDefault();
        //set the time to 3min...3X60
        gameTimer(180, resetGame);
        //get the coordinates/pixels of the mouse position when the player clicks on the canvas
        let position = getMousePos(easyGameCanvas, event);

        //p0
        if ((position.x > 0 && position.x < 101) && (position.y > 0 && position.y < 81)) {
            if (positions[1].availablity) {
                //makeMove(from, to)
                makeMove(positions[0], positions[1]);
            } else if (positions[3].availablity) {
                makeMove(positions[0], positions[3]);
            }
        }
        //p1
        else if ((position.x > 102 && position.x < 202) && (position.y > 0 && position.y < 81)) {
            if (positions[0].availablity) {
                makeMove(positions[1], positions[0]);
            } else if (positions[2].availablity) {
                makeMove(positions[1], positions[2]);
            } else if (positions[4].availablity) {
                makeMove(positions[1], positions[4]);
            }
        }
        //p2
        else if ((position.x > 203 && position.x < 303) && (position.y > 0 && position.y < 81)) {
            if (positions[1].availablity) {
                makeMove(positions[2], positions[1]);
            } else if (positions[5].availablity) {
                makeMove(positions[2], positions[5]);
            }
        }
        //p3
        else if ((position.x > 0 && position.x < 101) && (position.y > 82 && position.y < 162)) {
            if (positions[0].availablity) {
                makeMove(positions[3], positions[0]);
            } else if (positions[4].availablity) {
                makeMove(positions[3], positions[4]);
            } else if (positions[6].availablity) {
                makeMove(positions[3], positions[6]);
            }
        }
        //p4
        else if ((position.x > 102 && position.x < 202) && (position.y > 82 && position.y < 162)) {
            if (positions[1].availablity) {
                makeMove(positions[4], positions[1]);
            } else if (positions[3].availablity) {
                makeMove(positions[4], positions[3]);
            } else if (positions[5].availablity) {
                makeMove(positions[4], positions[5]);
            } else if (positions[7].availablity) {
                makeMove(positions[4], positions[7]);
            }
        }
        //p5
        else if ((position.x > 203 && position.x < 303) && (position.y > 82 && position.y < 162)) {
            if (positions[2].availablity) {
                makeMove(positions[5], positions[2]);
            } else if (positions[4].availablity) {
                makeMove(positions[5], positions[4]);
            } else if (positions[8].availablity) {
                makeMove(positions[5], positions[8]);
            }
        }
        //p6
        else if ((position.x > 0 && position.x < 101) && (position.y > 163 && position.y < 243)) {
            if (positions[3].availablity) {
                makeMove(positions[6], positions[3]);
            } else if (positions[7].availablity) {
                makeMove(positions[6], positions[7]);
            }
        }
        //p7
        else if ((position.x > 102 && position.x < 202) && (position.y > 163 && position.y < 243)) {
            if (positions[4].availablity) {
                makeMove(positions[7], positions[4]);
            } else if (positions[6].availablity) {
                makeMove(positions[7], positions[6]);
            } else if (positions[8].availablity) {
                makeMove(positions[7], positions[8]);
            }
        }
        //p8
        else if ((position.x > 203 && position.x < 303) && (position.y > 163 && position.y < 243)) {
            if (positions[5].availablity) {
                makeMove(positions[8], positions[5]);
            } else if (positions[7].availablity) {
                makeMove(positions[8], positions[7]);
            }
        }
        if (checkGameResult(positions)) {
            displayMessage();
        }
    })
}
module.exports = easierPuzzel;