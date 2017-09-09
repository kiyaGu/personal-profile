let currentGame, canvasContext;
//construct objects to hold position, x and y coordinate
let PuzzelEntry = function(position, puzzelNumber, currentLocation) {
    this.position = position;
    this.puzzelNumber = puzzelNumber;
    this.currentLocation = currentLocation;
}

let PuzzelBoardPosition = function(x, y, availablity, posNumber, currentPlaceHolder) {
    this.x = x;
    this.y = y;
    this.availablity = availablity;
    this.positionNumber = posNumber;
    this.currentPlaceHolder = currentPlaceHolder;
}
let getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}
let makeMove = function(moveFrom, moveTo) {
    moveTo.currentPlaceHolder = moveFrom.currentPlaceHolder;
    drawNumberImg(moveTo.x, moveTo.y, moveTo.currentPlaceHolder);
    moveFrom.availablity = true;
    moveTo.availablity = false;
    if (currentGame == "easierPuzzel")
        drawNumberImg(moveFrom.x, moveFrom.y, 9);
    else if (currentGame == "harderPuzzel")
        drawNumberImg(moveFrom.x, moveFrom.y, 16);

    if (currentGame == "easierPuzzel")
        moveFrom.currentPlaceHolder = 9;
    else if (currentGame == "harderPuzzel")
        moveFrom.currentPlaceHolder = 16;
}
let generateRandomNumber = function(upperBound) {
    return (Math.floor(Math.random() * upperBound) + 1);
}
let drawNumberImg = function(dx, dy, i) {
    let img = document.createElement("img");
    if (currentGame == "easierPuzzel")
        img.src = "/images/numbers" + i + ".gif";
    else if (currentGame == "harderPuzzel")
        img.src = "/images/puzzel15/numbers" + i + ".gif";
    img.addEventListener("load", function() {
        canvasContext.clearRect(dx, dy, 100, 80);
        canvasContext.drawImage(img, dx, dy);
    });
}

let gameTimer = function(ceiling, callback) {
    //game timer 
    shortly = new Date();
    shortly.setSeconds(shortly.getSeconds() + ceiling);
    // $('#game-timer').countdown('option', { until: shortly });
    $('#game-timer').countdown({
        until: shortly,
        expiryText: '<span>Oops, you LOST!!!</span>',
        onExpiry: callback,
        format: 'MS'
    });
}
let checkPosition = function(positions, i) {
    return (positions[i].positionNumber == i && positions[i].currentPlaceHolder == i + 1);

}
let checkGameResult = function(positions) {
    let test = positions.reduce((preTest, position) => {
        return preTest && checkPosition(positions, positions.indexOf(position))
    });
    return test;
}

module.exports.setup = generateRandomNumber;