const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/client', function(req, res) {
    console.log('Received: ' + req);
});
