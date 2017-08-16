const express = require('express');
const app = express();

app.use(express.static("my_portfolio_page"));
app.listen(process.env.PORT || 3333, function() {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});