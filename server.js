const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const GitHubApi = require('github');
const sendEmail = require('./public/assets/js/sendEmail');
const fs = require('fs');
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

app.use(express.static('public/css'));

app.locals.player = [];

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());


//an object to hold the generated operators, operand and the calculated result
let given;
//for generating random operands
function generateRandomOperands() {
    //pick two integers between 0 and 100
    let number1 = Math.floor(Math.random() * (100 - 0) + 0);
    let number2 = Math.floor(Math.random() * (100 - 0) + 0);
    return {
        random1: number1,
        random2: number2
    }
}

//for generating the operator
function chooseOperator() {
    let operators = ['+', '-', '*', '/', '%'];
    //to select a random operator
    let index = Math.floor(Math.random() * (5 - 0) + 0);
    return operators[index];
}
//to round the given number to two decimal place
function roundToTwoDecPlace(res) {
    return Math.round((res) * 100) / 100;
}
//for calculating math results
function mathGame(callback) {
    let selectedOperator = chooseOperator();
    let operands = generateRandomOperands();

    switch (selectedOperator) {
        case '+':
            result = roundToTwoDecPlace(operands.random1 + operands.random2);
            break;
        case '-':
            result = roundToTwoDecPlace(operands.random1 - operands.random2);
            break;
        case '*':
            result = roundToTwoDecPlace(operands.random1 * operands.random2);
            break;
        case '/':
            if (operands.random2 !== 0)
                result = roundToTwoDecPlace(operands.random1 / operands.random2);
            else
                result = NAN
            break;
        case '%':
            result = roundToTwoDecPlace(operands.random1 % operands.random2)
    }

    given = {
        operator: selectedOperator,
        number1: operands.random1,
        number2: operands.random2,
        givenResult: result
    };

    //execute a callback if there is
    if (arguments.length == 1)
        callback();
}


app.get('/', (req, res) => {
    //to give the user the initial numbers and the operator 
    mathGame();
    //to collect the list of players and their score
    let playersFile;
    fs.readFile(__dirname + '/public/data/players.json', (error, file) => {
        if (error) {
            console.log("File not found");
        }
        //if the file exists
        playersFile = JSON.parse(file);
        //sort the returned file based on the players score descendingly
        playersFile.sort(function(a, b) {
            return b.score - a.score;
        });
    }); //fs.read
    //fetch all the repository of the user kiyagu
    github.repos.getAll({})
        .then((repos) => { //server the index view with the given variables
            res.render('index', {
                repos: repos.data,
                inputGiven: given,
                playersList: playersFile
            });
        })
        .catch((err) => {
            console.log(err)
        })
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
    mathGame(function() {
        //read pla
        let parsedFile = {};
        fs.readFile(__dirname + '/public/data/players.json', (error, file) => {
            if (error) throw err
                //if the file is not empty
            parsedFile = JSON.parse(file);
            if (parsedFile.length > 0) {
                let index = 0
                for (; index < parsedFile.length; index++) {
                    if (parsedFile[index].name.toLowerCase() === req.fields.playerName.toLowerCase()) {
                        if (prevResult === Number(req.fields.answer)) {
                            ++parsedFile[index].score;
                            //prepare response
                            let successResponse = JSON.stringify({
                                verdict: "Well done, keep playing!!!",
                                inputGiven: given,
                                currentPlayer: parsedFile[index]
                            });
                            res.send(successResponse);
                            res.end();
                        } else {
                            if (parsedFile[index].score > 0) {
                                --parsedFile[index].score;
                            } else {
                                parsedFile[index].score = 0;
                            }
                            let ErrorResponse = JSON.stringify({
                                verdict: "Wrong, the answer is => <span>" + prevResult + "</span>",
                                inputGiven: given,
                                currentPlayer: parsedFile[index]
                            });
                            res.send(ErrorResponse);
                            res.end();
                        }
                        break;
                    }
                }
                if (index == parsedFile.length) {
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
                    parsedFile.push(currentPlayer);
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
                parsedFile.push(currentPlayer);
            }
            //update or insert new player to the players.json file 
            fs.writeFile(__dirname + '/public/data/players.json', JSON.stringify(parsedFile), function(error) {
                if (error) {
                    console.log(error);
                }
            });
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
// app.get('/getReadme', (req, res) => {
//     res.render('githubReadme');
// });
// app.get('/githubreadmeBack', (req, res) => {
//     // res.setHeader("Content-Type", "text/html");
//     res.redirect('index');
// });
process.setMaxListeners(0);
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});