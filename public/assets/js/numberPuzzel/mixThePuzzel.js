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
