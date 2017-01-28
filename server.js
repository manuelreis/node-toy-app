const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs')

// MongoDB
var db = mongojs('node-toy', ['clients'])

db.on('error', function (err) {
    console.log('database error', err)
})

db.on('connect', function () {
    console.log('database connected')
})

const app = express();
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/clients', function(req, res){
    var dump = db.clients.find().toArray();
    res.send(dump);
});

app.post('/client', function(req, res) {
    console.log(req.body);
    db.clients.save(req.body, function(err, res){
        if(err) console.log(err);
    });
    res.redirect('/');
});
