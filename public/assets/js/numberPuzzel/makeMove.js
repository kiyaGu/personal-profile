
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
