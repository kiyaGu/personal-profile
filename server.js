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

app.get('/', (req, res) => {
    const reposjson = fetch('https://api.github.com/users/kiyagu/repos')
        .then((res) => {
            return res.json();
        }).then((json) => {

            res.render('index', {
                repos: json
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
            res.end('{ "message": "Error: your mesage can\'t be send at the moment " }');
        }
        res.end('{ "message": "Thank you for contacting me, I will respond to you ASAP! :)" }');
    });


});

app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});