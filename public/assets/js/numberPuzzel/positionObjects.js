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
