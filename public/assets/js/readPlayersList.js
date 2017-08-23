const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
//an object to hold the generated operators, operand and the calculated result
function readPlayersList() {
    var filePath = 'public/data/players.json';
    return fs.readFileAsync(filePath)
        .then((data) => {
            playersFile = JSON.parse(data);
            //sort the returned file based on the players score descendingly
            playersFile.sort(function(a, b) {
                return b.score - a.score;
            });
            return playersFile;
        });
}
module.exports = readPlayersList;