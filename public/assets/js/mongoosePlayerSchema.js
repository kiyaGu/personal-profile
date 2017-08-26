const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating our player schema

let playerSchema = new Schema({
    name: String,
    score: Number
});

//creating our model using our schema
let Player = mongoose.model('Player', playerSchema);

//making it available in the application
module.exports = Player;