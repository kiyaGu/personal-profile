(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let checkPosition = function(positions, i) {
  //check if the position number and the current place holder hold the same value
    return (positions[i].positionNumber == i && positions[i].currentPlaceHolder == i + 1);
}
let checkGameResult = function(positions) {
     //check the position number and the current placeholder value for each entry
    let test = positions.reduce((preTest, position) => {
        return preTest && checkPosition(positions, positions.indexOf(position))
    });
    return test;
}

module.exports = checkGameResult;

},{}],2:[function(require,module,exports){
let displayMessage = function() {
  const easierPuzzel = require('./easierPuzzel');
  const harderPuzzel = require('./harderPuzzel');
    document.getElementById('resultContainer').innerHTML = "<p id='result' class='animated flash'><span>Congratulation</span>, you won...HURRAH!!!</p>";
    $('#game-timer').countdown('destroy');
    setTimeout(() => {
        document.getElementById('resultContainer').innerHTML = "";
        if (currentGame == "easierPuzzel")
            easierPuzzel();
        else
            harderPuzzel();
    }, 3000);

}

module.exports = displayMessage;

},{"./easierPuzzel":4,"./harderPuzzel":8}],3:[function(require,module,exports){
let drawNumberImg = function(dx, dy, i) {
    let img = document.createElement("img");
    if (currentGame == "easierPuzzel")
        img.src = "/assets/images/images/numbers" + i + ".gif";
    else if (currentGame == "harderPuzzel")
        img.src = "/assets/images/images/puzzel15/numbers" + i + ".gif";
    img.addEventListener("load", function() {
        if (currentGame == "harderPuzzel") {
            canvasContext.clearRect(dx, dy, 80, 70);
            canvasContext.drawImage(img, dx, dy, 80, 70);
        } else {
            canvasContext.clearRect(dx, dy, 100, 80);
            canvasContext.drawImage(img, dx, dy);
        }
    });
}
module.exports = drawNumberImg;
},{}],4:[function(require,module,exports){
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
},{"./checkGameResult":1,"./displayMessage":2,"./drawImage":3,"./gameTimer":5,"./getMousePosition":7,"./makeMove":9,"./mixThePuzzel":10,"./positionNumberEntries":11,"./positionObjects":12,"./resetThePuzzel":15}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
let generateRandomNumber = function(upperBound) {
    return (Math.floor(Math.random() * upperBound) + 1);
}
module.exports = generateRandomNumber;

},{}],7:[function(require,module,exports){
let getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}
module.exports = getMousePos;

},{}],8:[function(require,module,exports){
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
//make it harder
let harderPuzzel = function() {
  currentGame = "harderPuzzel";
  //to hold the randomely generated number for the mixing the puzzel
  this.index = [];
  mixThePuzzel(16);

  this.positions = [];
  //x and y pixel/coordinate positions to construct the images from
  let x = [0,81,162,243];
  let y = [0,71,142,213];
  createThePositionObjects(x , y,index);
  this.puzzelEntryNumbers = [];
  createPositionNumberEntries(16,index);

  let harderGameCanvas = document.getElementById('harder-puzzel');
  canvasContext = harderGameCanvas.getContext('2d');
  canvasContext.clearRect(0, 0, harderGameCanvas.width, harderGameCanvas.height);

  //for each position in the canvas draw the numbers
  puzzelEntryNumbers.forEach((element) => {
      drawNumberImg(element.position.x, element.position.y, element.puzzelNumber);
  })
  // listen for mouse click with in the canvas area
  harderGameCanvas.addEventListener('click', (event) => {
      event.preventDefault();
      let position = getMousePos(harderGameCanvas, event);
      //set the time to 5min
      gameTimer(300, resetGame);

      //p0..1,4
      if (position.x > 0 && position.x < 81 && position.y > 0 && position.y < 71) {
          if (positions[1].availablity) {
            //makeMove(from, to)
              makeMove(positions[0], positions[1]);
          } else if (positions[4].availablity) {
              makeMove(positions[0], positions[4]);
          }
      }
      //p1...0,2,5
      else if (position.x > 82 && position.x < 162 && position.y > 0 && position.y < 71) {
          if (positions[0].availablity) {
              makeMove(positions[1], positions[0]);
          } else if (positions[2].availablity) {
              makeMove(positions[1], positions[2]);
          } else if (positions[5].availablity) {
              makeMove(positions[1], positions[5]);
          }
      }
      //p2...1,3,6
      else if (position.x > 163 && position.x < 243 && position.y > 0 && position.y < 71) {
          if (positions[1].availablity) {
              makeMove(positions[2], positions[1]);
          } else if (positions[3].availablity) {
              makeMove(positions[2], positions[3]);
          } else if (positions[6].availablity) {
              makeMove(positions[2], positions[6]);
          }
      }
      //p3...2,7
      else if (position.x > 244 && position.x < 324 && position.y > 0 && position.y < 71) {
          if (positions[2].availablity) {
              makeMove(positions[3], positions[2]);
          } else if (positions[7].availablity) {
              makeMove(positions[3], positions[7]);
          }
      }
      //p4....0,5,8
      else if (position.x > 0 && position.x < 81 && position.y > 72 && position.y < 142) {
          if (positions[0].availablity) {
              makeMove(positions[4], positions[0]);
          } else if (positions[5].availablity) {
              makeMove(positions[4], positions[5]);
          } else if (positions[8].availablity) {
              makeMove(positions[4], positions[8]);
          }
      }
      //p5...1,4,6,9
      else if (position.x > 82 && position.x < 162 && position.y > 72 && position.y < 142) {
          if (positions[1].availablity) {
              makeMove(positions[5], positions[1]);
          } else if (positions[4].availablity) {
              makeMove(positions[5], positions[4]);
          } else if (positions[6].availablity) {
              makeMove(positions[5], positions[6]);
          } else if (positions[9].availablity) {
              makeMove(positions[5], positions[9]);
          }
      }
      //p6...2,5,7,10
      else if (position.x > 163 && position.x < 243 && position.y > 72 && position.y < 142) {
          if (positions[2].availablity) {
              makeMove(positions[6], positions[2]);
          } else if (positions[5].availablity) {
              makeMove(positions[6], positions[5]);
          } else if (positions[7].availablity) {
              makeMove(positions[6], positions[7]);
          } else if (positions[10].availablity) {
              makeMove(positions[6], positions[10]);
          }
      }
      //p7..3,6,11
      else if (position.x > 244 && position.x < 324 && position.y > 72 && position.y < 142) {
          if (positions[3].availablity) {
              makeMove(positions[7], positions[3]);
          } else if (positions[6].availablity) {
              makeMove(positions[7], positions[6]);
          } else if (positions[11].availablity) {
              makeMove(positions[7], positions[11]);
          }
      }
      //p8...4,9,12
      else if (position.x > 0 && position.x < 81 && position.y > 143 && position.y < 213) {
          if (positions[4].availablity) {
              makeMove(positions[8], positions[4]);
          } else if (positions[9].availablity) {
              makeMove(positions[8], positions[9]);
          } else if (positions[12].availablity) {
              makeMove(positions[8], positions[12]);
          }
      }

      //p9...5,8,10,13
      else if (position.x > 82 && position.x < 162 && position.y > 143 && position.y < 213) {
          if (positions[5].availablity) {
              makeMove(positions[9], positions[5]);
          } else if (positions[8].availablity) {
              makeMove(positions[9], positions[8]);
          } else if (positions[10].availablity) {
              makeMove(positions[9], positions[10]);
          } else if (positions[13].availablity) {
              makeMove(positions[9], positions[13]);
          }
      }
      //p10...6,9,11,14
      else if (position.x > 163 && position.x < 243 && position.y > 143 && position.y < 213) {
          if (positions[6].availablity) {
              makeMove(positions[10], positions[6]);
          } else if (positions[9].availablity) {
              makeMove(positions[10], positions[9]);
          } else if (positions[11].availablity) {
              makeMove(positions[10], positions[11]);
          } else if (positions[14].availablity) {
              makeMove(positions[10], positions[14]);
          }
      }
      //p11..7,10,15
      else if (position.x > 244 && position.x < 324 && position.y > 143 && position.y < 213) {
          if (positions[7].availablity) {
              makeMove(positions[11], positions[7]);
          } else if (positions[10].availablity) {
              makeMove(positions[11], positions[10]);
          } else if (positions[15].availablity) {
              makeMove(positions[11], positions[15]);
          }
      }
      //p12...8,13
      else if (position.x > 0 && position.x < 81 && position.y > 214 && position.y < 284) {
          if (positions[8].availablity) {
              makeMove(positions[12], positions[8]);
          } else if (positions[13].availablity) {
              makeMove(positions[12], positions[13]);
          }
      }
      //p13...9,12,14
      else if (position.x > 82 && position.x < 162 && position.y > 214 && position.y < 284) {
          if (positions[9].availablity) {
              makeMove(positions[13], positions[9]);
          } else if (positions[12].availablity) {
              makeMove(positions[13], positions[12]);
          } else if (positions[14].availablity) {
              makeMove(positions[13], positions[14]);
          }
      }
      //p14...10,13,15
      else if (position.x > 163 && position.x < 243 && position.y > 214 && position.y < 284) {
          if (positions[10].availablity) {
              makeMove(positions[14], positions[10]);
          } else if (positions[13].availablity) {
              makeMove(positions[14], positions[13]);
          } else if (positions[15].availablity) {
              makeMove(positions[14], positions[15]);
          }
      }
      //p15...11,14
      else if (position.x > 244 && position.x < 324 && position.y > 214 && position.y < 284) {
          if (positions[11].availablity) {
              makeMove(positions[15], positions[11]);
          } else if (positions[14].availablity) {
              makeMove(positions[15], positions[14]);
          }
      }
      if (checkGameResult(positions)) {
          displayMessage();
      }
  })
}
module.exports = harderPuzzel;

},{"./checkGameResult":1,"./displayMessage":2,"./drawImage":3,"./gameTimer":5,"./getMousePosition":7,"./makeMove":9,"./mixThePuzzel":10,"./positionNumberEntries":11,"./positionObjects":12,"./resetThePuzzel":15}],9:[function(require,module,exports){

let makeMove = function(moveFrom, moveTo) {
  const drawNumberImg = require('./drawImage');
    moveFrom.availablity = true;
    moveTo.availablity = false;
    moveTo.currentPlaceHolder = moveFrom.currentPlaceHolder;
    drawNumberImg(moveTo.x, moveTo.y, moveTo.currentPlaceHolder);

    if (currentGame == "easierPuzzel")
        drawNumberImg(moveFrom.x, moveFrom.y, 9);
    else if (currentGame == "harderPuzzel")
        drawNumberImg(moveFrom.x, moveFrom.y, 16);

    if (currentGame == "easierPuzzel")
        moveFrom.currentPlaceHolder = 9;
    else if (currentGame == "harderPuzzel")
        moveFrom.currentPlaceHolder = 16;
}
module.exports = makeMove;

},{"./drawImage":3}],10:[function(require,module,exports){
const generateRandomNumber = require('./generateRandomNumbers');
let mixThePuzzel = function(times){
  if (index.length < times) {
    let value = generateRandomNumber(times);
    if (index.length == 0) {
      index.push(value);
    } else {
      if (!(index.includes(value)))
        index.push(value);
    }
    mixThePuzzel(times);
  }
}
module.exports = mixThePuzzel;

},{"./generateRandomNumbers":6}],11:[function(require,module,exports){
const PuzzelEntry  = require('./puzzelEntry');
let createPositionNumberEntries = function (size,index){
  //(position, puzzelNumber, currentLocation)
  for(let i= 0; i< size; i++){
    puzzelEntryNumbers.push(new PuzzelEntry(positions[i], index[i], i));
  }
}
module.exports = createPositionNumberEntries;

},{"./puzzelEntry":14}],12:[function(require,module,exports){
const PuzzelBoardPosition = require('./puzzelBoardPosition');
let createThePositionObjects = function(x,y,index){
  let counter = 0;
  for(j=0; j< y.length; j++){
    for(let i = 0; i < x.length; i++){
       positions.push(new PuzzelBoardPosition(x[i], y[j], false, counter, index[counter]));
       ++counter;
    }
  }
  //make the position without numbers availabel for move
  positions.forEach((element) => {
      if (element.currentPlaceHolder == positions.length)
          element.availablity = true;
  })
}
module.exports = createThePositionObjects;

},{"./puzzelBoardPosition":13}],13:[function(require,module,exports){
let PuzzelBoardPosition = function(x, y, availablity, posNumber, currentPlaceHolder) {
    this.x = x;
    this.y = y;
    this.availablity = availablity;
    this.positionNumber = posNumber;
    this.currentPlaceHolder = currentPlaceHolder;
}
module.exports = PuzzelBoardPosition;

},{}],14:[function(require,module,exports){
//construct objects to hold position, x and y coordinate
let PuzzelEntry = function(position, puzzelNumber, currentLocation) {
    this.position = position;
    this.puzzelNumber = puzzelNumber;
    this.currentLocation = currentLocation;
}
module.exports = PuzzelEntry; 

},{}],15:[function(require,module,exports){
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
},{"./easierPuzzel":4,"./harderPuzzel":8}],16:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./drawImage":3,"./easierPuzzel":4,"./gameTimer":5,"./generateRandomNumbers":6,"./getMousePosition":7,"./harderPuzzel":8,"./makeMove":9,"./puzzelBoardPosition":13,"./puzzelEntry":14,"./resetThePuzzel":15}]},{},[16]);
