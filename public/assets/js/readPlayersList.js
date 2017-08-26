// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const mongoose = require('mongoose');
//our collection model
const Player = require('./mongoosePlayerSchema');

function readPlayersList() {
    mongoose.connect('mongodb://localhost:27017/players');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return Player.find(function(err, playersCollection) {
        if (err) return console.error(err);
        //close the connection
        mongoose.connection.close();
        return playersCollection;
    }).sort({ score: -1 }); //sort the result based on score from high -> low
}
module.exports = readPlayersList;