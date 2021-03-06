//Player collection model
const Player = require('./mongoosePlayerSchema');

function readPlayersCollection() {
    // Player.remove({}, function(err) {
    //     console.log('collection removed')
    // });
    return Player.find({}, function(err, playersCollection) {
        if (err) return console.error(err);
        return playersCollection;
    }).sort({ score: -1 }); //sort the result based on score from high -> low
}
module.exports = readPlayersCollection;