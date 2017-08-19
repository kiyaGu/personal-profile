const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const nodemailer = require('nodemailer');
const projectRoot = path.resolve(__dirname, '')
const app = express();
app.use(express.static('public/css'));

// app.use(express.static(path.join(__dirname, '/public'), { 'extensions': ['html'] }));
// app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(formidable());


//game operator and numbers
let operators = ['+', '-', '*', '/', '%'];
let index = Math.floor(Math.random() * (4 - 0) + 0);
let random1 = Math.floor(Math.random() * (100 - 0) + 0);
let random2 = Math.floor(Math.random() * (100 - 0) + 0);
let selectedOperator = operators[index];
let result;

function roundToTwoDecPlace(res) {
    return Math.round((res) * 100) / 100;
}
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
            result = "NAN"
        break;
    case '%':
        result = roundToTwoDecPlace(random1 % random2)
}

// result = random1 + operators[index] + random2;
// console.log(random1, random2, selectedOperator, result);
let given = {
    operator: operators[index],
    number1: random1,
    number2: random2,
    result: result
};

app.get('/', (req, res) => {

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

app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});