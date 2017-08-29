const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const GitHubApi = require('github');
const sendEmail = require('./public/assets/js/sendEmail');
const mathGame = require('./public/assets/js/mathGame');
const readPlayersCollection = require('./public/assets/js/readPlayersCollection');
const saveToPlayersListFile = require('./public/assets/js/saveToPlayersListFile');
const checkMathGameResult = require('./public/assets/js/checkMathGameResult');
const recordNewPlayer = require('./public/assets/js/recordNewPlayer');
const fetch = require('node-fetch');
const convertMd = require("convert-md");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
let db = mongoose.connection;
//instance to access the github API
const github = new GitHubApi({
    headers: { //to get the decoded content of the readme files
        "accept": "application/vnd.github.V3.raw",
    }
});
github.authenticate({
    type: "basic",
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD
})
const app = express();
app.use(cookieParser());

// set a cookie
app.use('/game', function(req, res, next) {
    // check if client sent cookie
    // res.clearCookie('currentPlayer');
    let cookie = req.cookies.currentPlayer;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('currentPlayer', randomNumber, { expire: new Date() + 9999, path: '/game' });

    }
    next(); // <-- important!
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());

let given; //to hold the operator, the operands and the result of the math game
app.get('/', (req, res) => {
    //to give the user the initial numbers and the operator
    mathGame((given) => {
        //fetch all the repository of the user kiyagu
        readPlayersCollection()
            .then((playersFile) => { //after getting the players list with their score
                // console.log(playersFile);
                let topTenPlayers = [];
                for (let index = 0; index < 10; index++) {
                    topTenPlayers.push(playersFile[index]);
                }
                github.repos.getAll({}) //collect the repos
                    .then((repos) => { //serve the index view with the given variables
                        res.render('index', {
                            repos: repos.data,
                            inputGiven: given,
                            playersList: topTenPlayers
                        });
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    });
});

//to send the email that is sent through the contact me form
app.post('/message', (req, res) => { sendEmail(req, res); });

/*===============
        game ===================*/

//to handle game answer submission
let currentPlayer;
app.post('/game', function(req, res) {
    //assign the result of the operands displayed to the user for later comparison
    let prevResult = result;
    //execute the mathGame() with the given callback
    mathGame(function(given) {
        readPlayersCollection()
            .then((playersFile) => {
                if (playersFile.length > 0) {
                    checkMathGameResult(playersFile, given, req, res, prevResult);
                } else { //if no player is recorded
                    let playersFile = [];
                    recordNewPlayer(playersFile, given, req, res, prevResult);
                }
            });
    }); //mathgame
}); //game

//github readme
app.post('/getReadmedata', (req, res) => {
    let readme = github.repos.getReadme({
        owner: req.fields.owner,
        repo: req.fields.repo
    }, function(errorr, response) {
        //convert the fetched md file to html
        convertMd(response.data, {
                type: "html"
            })
            .then(stream => {
                //send the content of the readme in the html format
                res.send(stream.content);
            })
            .catch(err => {
                console.error(err)
            })
    });
});

process.setMaxListeners(0);
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});