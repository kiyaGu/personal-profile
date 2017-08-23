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
            //display only the top 10 players
            //if it is less than 10 no need to filter the top 10
            if (playersFile.length > 10) {
                let topTenPlayers = [];
                for (let i = 0; i < 10; i++) {
                    topTenPlayers.push(playersFile[i]);
                }
                return topTenPlayers;
            } else {
                return playersFile;
            }
        });
}
module.exports = readPlayersList;