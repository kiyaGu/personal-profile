const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const session = require('client-sessions');
const GitHubApi = require('github');
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
app.use(session({
    cookieName: 'currentPlayerName',
    secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK', // CHANGE THIS!
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//game operator and numbers
let given;

function mathGame(callback) {
    let operators = ['+', '-', '*', '/', '%'];
    //to select a random operator
    let index = Math.floor(Math.random() * (5 - 0) + 0);
    let random1 = Math.floor(Math.random() * (100 - 0) + 0);
    let random2 = Math.floor(Math.random() * (100 - 0) + 0);
    let selectedOperator = operators[index];

    switch (selectedOperator) {
        case '+':
            result = roundToTwoDecPlace(random1 + random2);
            break;
        case '-':
            result = roundToTwoDecPlace(random1 - random2);
            break;
        case '*':
            result = roundToTwoDecPlace(random1 * random2);
            break;
        case '/':
            if (random2 !== 0)
                result = roundToTwoDecPlace(random1 / random2);
            else
                result = NAN
            break;
        case '%':
            result = roundToTwoDecPlace(random1 % random2)
    }

    given = {
        operator: selectedOperator,
        number1: random1,
        number2: random2,
        givenResult: result
    };

    //execute a callbac if it exists
    if (arguments.length == 1)
        callback();
}

function roundToTwoDecPlace(res) {
    return Math.round((res) * 100) / 100;
}


mathGame();
app.get('/', (req, res) => {
    mathGame();
    let playersFile;
    fs.readFile(__dirname + '/public/data/players.json', (error, file) => {
        if (error) console.log(error);
        //if the file is not empty
        playersFile = JSON.parse(file);
        playersFile.sort(function(a, b) {
            return b.score - a.score;
        });
    }); //fs.read
    const reposjson = fetch('https://api.github.com/users/kiyagu/repos', {
            headers: {
                type: "basic",
                username: process.env.USER_NAME,
                password: process.env.PASS
            }
        })
        .then((res) => {
            return res.json();
        }).then((json) => {
            res.render('index', {
                repos: json,
                inputGiven: given,
                playersList: playersFile
            });
        });
});


app.post('/message', function(req, res) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { //use environment variables for security
            user: process.env.USER_NAME,
            pass: process.env.EMAIL_PASS
        }
    });

    // setup email data
    let mailOptions = {
        from: req.fields.name + "<hamilee.kiya@gmail.com>", // sender address
        to: 'hamilee.kiya@gmail.com', // list of receivers
        subject: req.fields.subject, // Subject line
        text: req.fields.message + "\nSent by :" + req.fields.email, // message body

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.end('{ "message": "Error: your mesage could not be sent at the moment " }');
        }
        res.end('{ "message": "Thank you for contacting me, I will respond to you ASAP! :)" }');
    });


});




//player constructor
var Players = function(name, score) {
    this.name = name;
    this.score = score;
}


//to handle game answer submission
let currentPlayer;
app.post('/game', function(req, res) {
    let prevResult = result;


    mathGame(function() {
        // prevResult = given.givenResult;
        // given = given;
        let parsedFile = {};
        fs.readFile(__dirname + '/public/data/players.json', (error, file) => {
            if (error) throw err
                //if the file is not empty
            parsedFile = JSON.parse(file);
            if (parsedFile.length > 0) {
                let index = 0
                for (; index < parsedFile.length; index++) {
                    if (parsedFile[index].name === req.fields.playerName) {
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