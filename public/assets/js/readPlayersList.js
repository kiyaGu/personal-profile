// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const mongoose = require('mongoose');
//our collection model
const Player = require('./mongoosePlayerSchema');

function readPlayersList() {
    mongoose.connect("mongodb://heroku_fntsrbx3:a6efqbtc5vddnicek2s8m2s3nj@ds127892.mlab.com:27892/heroku_fntsrbx3");
    let db = mongoose.connection;
    return Player.find({}, function(err, playersCollection) {
        if (err) return console.error(err);
        //close the connection
        // db.close();
        return playersCollection;
    }).sort({ score: -1 }); //sort the result based on score from high -> low
}
module.exports = readPlayersList;