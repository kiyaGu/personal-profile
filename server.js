const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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

app.use(express.static(path.join(__dirname, '/public')));
app.listen(process.env.PORT || 3333, () => {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});