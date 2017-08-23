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
const checkMathGameResult = require('./public/assets/js/checkMathGameResult');
const recordNewPlayer = require('./public/assets/js/recordNewPlayer');
// const projectRoot = path.resolve(__dirname, '');
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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());


let given; //to hold the operator, the operands and the result of the math game
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

                playersFile = checkMathGameResult(playersFile, given, req, res, prevResult);
            } else { //if no player is recorded
                playersFile = recordNewPlayer(playersFile, given, req, res, prevResult);
            }
            saveToPlayersListFile(playersFile);
        });
    }); //mathgame
}); //game
//github readme
app.post('/getReadmedata', (req, res) => {
    let readme = github.repos.getReadme({
        owner: req.fields.owner,
        repo: req.fields.repo
    }, function(errorr, response) {
        res.send(response);
    });

});

process.setMaxListeners(0);
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});