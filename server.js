const express = require('express');
var request = require('request');
var fetch = require('node-fetch');
var path = require('path');
const app = express();
const exphbs = require('express-handlebars');
// Then these two lines after you initialise your express app 
// Then these two lines after you initialise your express app 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function(req, res) {

    var reposjson = fetch('https://api.github.com/users/kiyagu/repos')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            res.render('partials/index', {
                repos: json // insert your name instead 
            });
        });


    // res.render('home');
});
// if you are on node v0.10, set a Promise library first, eg. 
// fetch.Promise = require('bluebird'); 

// plain text or html 

// fetch('https://api.github.com/users/kiyagu/repos')
//     .then(function(res) {
//         return res.text();
//     }).then(function(body) {
//         console.log(body);
//     });

// json 

// let username = process.env.USER_NAME;
// let password = process.env.PASS;
// fetch('https://api.github.com/users/kiyagu/repos')
//     .then(function(res) {
//         return res.json();
//     }).then(function(json) {

//         app.use(express.static(__dirname + "/", { 'extensions': ['html'] }));

//         let gitsection = document.querySelectorAll('#github-api-data');
//         console.log(gitsection);
//         json.forEach(function(element) {

//             // res.send("<li>" + element.url + "</li>");
//         })

//     });

// app.use(express.static(__dirname + "/", { 'extensions': ['html'] }));
app.use(express.static(path.join(__dirname, '/public')));
app.listen(process.env.PORT || 3333, function() {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});

/*
html_url
language

*/