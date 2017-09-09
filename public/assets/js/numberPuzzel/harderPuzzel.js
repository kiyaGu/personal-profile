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
