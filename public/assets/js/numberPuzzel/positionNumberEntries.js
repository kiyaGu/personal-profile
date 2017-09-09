const PuzzelEntry  = require('./puzzelEntry');
let createPositionNumberEntries = function (size,index){
  //(position, puzzelNumber, currentLocation)
  for(let i= 0; i< size; i++){
    puzzelEntryNumbers.push(new PuzzelEntry(positions[i], index[i], i));
  }
}
module.exports = createPositionNumberEntries;
