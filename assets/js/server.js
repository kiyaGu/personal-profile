const express = require('express');
const app = express();
app.listen(3333, function() {
    console.log('Server is listening on port 3333. Ready to accept requests!');
});