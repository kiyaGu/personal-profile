const fs = require('fs');
//an object to hold the generated operators, operand and the calculated result
function saveToPlayersListFile(playersFile) {
    //update or insert new player to the players.json file 
    fs.writeFile('public/data/players.json', JSON.stringify(playersFile), function(error) {
        if (error) {
            console.log("File not saved");
        }
    });
}
module.exports = saveToPlayersListFile;