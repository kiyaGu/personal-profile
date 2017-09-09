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
