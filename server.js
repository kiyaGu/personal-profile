const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const GitHubApi = require('github');
const sendEmail = require('./public/assets/js/sendEmail');
const mathGame = require('./public/assets/js/mathGame');
const readPlayersList = require('./public/assets/js/readPlayersList');
const saveToPlayersListFile = require('./public/assets/js/saveToPlayersListFile');
const projectRoot = path.resolve(__dirname, '');
const github = new GitHubApi({
    headers: { //to get the decoded content of the readme files
        "accept": "application/vnd.github.V3.raw",
    }
});
github.authenticate({
    type: "basic",
    username: process.env.USER_NAME,
    password: process.env.PASS
})
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());


let given;
app.get('/', (req, res) => {
    //to give the user the initial numbers and the operator 
    mathGame((given) => {
        //fetch all the repository of the user kiyagu
        readPlayersList().then((playersFile) => { //after getting the players list with their score
            github.repos.getAll({}) //collect the repos
                .then((repos) => { //serve the index view with the given variables
                    res.render('index', {
                        repos: repos.data,
                        inputGiven: given,
                        playersList: playersFile
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
//player constructor
var Players = function(name, score) {
    this.name = name;
    this.score = score;
}

//to handle game answer submission
let currentPlayer;
app.post('/game', function(req, res) {
    //assign the result of the operands displayed to the user for later comparison
    let prevResult = result;
    //execute the mathGame() with the given callback
    mathGame(function(given) {
        //read pla
        let playersFile = {};
        readPlayersList().then((playersFile) => {
            if (playersFile.length > 0) {
                let index = 0
                for (; index < playersFile.length; index++) {
                    if (playersFile[index].name.toLowerCase() === req.fields.playerName.toLowerCase()) {
                        if (prevResult === Number(req.fields.answer)) {
                            ++playersFile[index].score;
                            //prepare response
                            let successResponse = JSON.stringify({
                                verdict: "Well done, keep playing!!!",
                                inputGiven: given,
                                currentPlayer: playersFile[index]
                            });
                            res.send(successResponse);
                            res.end();
                        } else {
                            if (playersFile[index].score > 0) {
                                --playersFile[index].score;
                            } else {
                                playersFile[index].score = 0;
                            }
                            let ErrorResponse = JSON.stringify({
                                verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                                inputGiven: given,
                                currentPlayer: playersFile[index]
                            });
                            res.send(ErrorResponse);
                            res.end();
                        }
                        break;
                    }
                }
                if (index == playersFile.length) {
                    currentPlayer = new Players(req.fields.playerName, 0);
                    if (prevResult === Number(req.fields.answer)) {
                        ++currentPlayer.score;
                        let successResponse = JSON.stringify({
                            verdict: "Well done, keep playing!!!",
                            inputGiven: given,
                            currentPlayer: currentPlayer
                        });
                        res.send(successResponse);
                        res.end();
                    } else {
                        let ErrorResponse = JSON.stringify({
                            verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                            inputGiven: given,
                            currentPlayer: currentPlayer
                        });
                        res.send(ErrorResponse);
                        res.end();
                    }
                    playersFile.push(currentPlayer);
                }
            } else {
                currentPlayer = new Players(req.fields.playerName, 0);
                if (prevResult === Number(req.fields.answer)) {
                    ++currentPlayer.score;
                    let successResponse = JSON.stringify({
                        verdict: "Well done, keep playing!!!",
                        inputGiven: given,
                        currentPlayer: currentPlayer
                    });
                    res.send(successResponse);
                } else {
                    let ErrorResponse = JSON.stringify({
                        verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                        inputGiven: given,
                        currentPlayer: currentPlayer
                    });
                    res.send(ErrorResponse);
                }
                playersFile.push(currentPlayer);
            }
            saveToPlayersListFile(playersFile);
        });
    }); //mathgame
}); //game
//github readme
app.post('/getReadmedata', (req, res) => {
    // let url = "https://api.github.com/repos/" + req.fields.owner + "/" + req.fields.repo + "/readme";
    let readme = github.repos.getReadme({
        owner: req.fields.owner,
        repo: req.fields.repo
    }, function(errorr, response) {
        console.log(response);
        res.send(response);
        res.end();
    });

});

process.setMaxListeners(0);
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});