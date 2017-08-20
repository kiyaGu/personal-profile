const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const session = require('client-sessions');
const projectRoot = path.resolve(__dirname, '')
const app = express();
app.use(express.static('public/css'));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());
app.use(session({
    secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK', // CHANGE THIS!
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//game operator and numbers
let operators, index, random1, random2, selectedOperator, given, rusult;

function mathGame(callback) {
    let operators = ['+', '-', '*', '/', '%'];
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
                result = NAN;
            break;
        case '%':
            result = roundToTwoDecPlace(random1 % random2)
    }
    given = {
        operator: operators[index],
        number1: random1,
        number2: random2,
        result: result
    };
    if (arguments.length == 1)
        callback();
}

function roundToTwoDecPlace(res) {
    return Math.round((res) * 100) / 100;
}

app.get('/', (req, res) => {
    mathGame();
    const reposjson = fetch('https://api.github.com/users/kiyagu/repos')
        .then((res) => {
            return res.json();
        }).then((json) => {
            res.render('index', {
                repos: json,
                inputGiven: given
            });
        });
});
app.post('/message', function(req, res) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { //use environment letiables for security
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

let score = 0;

//player constructor

var Players = function(name, score) {
        this.name = name;
        this.score = score;
    }
    //to handle game answer submission
let currentPlayer;
app.post('/game', function(req, res) {



    //req.session.username
    // console.log(req.session_state.player);

    let prevResult = result;
    mathGame(function() {
        { //to pass it as a json
            //check if the user is not new

            if (!(req.session_state.player) && req.fields.name !== "") {
                req.session_state.player = req.fields.name;
                currentPlayer = new Players(req.session_state.player, score);
                //if (req.session_state.player != req.fields.name || req.fields.name != "") 
            } else {
                currentPlayer = JSON.parse(currentPlayer)
                    // console.log(currentPlayer);
            }


            given = JSON.stringify(given);
            // currentPlayer = JSON.stringify(currentPlayer);
            if (prevResult === Number(req.fields.answer)) {
                //success message and new operator and operands for the next game
                currentPlayer.score = ++currentPlayer.score;
                // currentPlayer.name = req.session_state.player;
                currentPlayer = JSON.stringify(currentPlayer);
                // console.log(currentPlayer.score)
                res.end('{"verdict":"Well done, keep playing!!!","inputGiven":' + given + ',"currentPlayer":' + currentPlayer + '}');
            } else {
                //error message and new operator and operands for the next game
                if (currentPlayer.score > 0) {
                    currentPlayer.score = --currentPlayer.score;
                } else {
                    currentPlayer.score = 0;
                }
                // currentPlayer.name = req.session_state.player;
                currentPlayer = JSON.stringify(currentPlayer);
                res.render('index', {
                    player: JSON.parse(currentPlayer)
                });
                res.end('{"verdict":"Wrong, the answer is => <span>  ' + prevResult + '</span>","inputGiven":' + given + ',"currentPlayer":' + currentPlayer + '}');
            }
        }
    })

});
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});