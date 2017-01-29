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

// Express
const app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.set('view engine', 'ejs');
app.use(express.static('static'))

app.listen(3000, function() {
    console.log('listening on 3000')
});

// REST Endpoints
app.get('/', function(req, res) {
    var dump = db.clients.find().toArray(function(err, result) {
        if(err) return console.log(err);
        res.render('index.ejs', { clients : result })
    });
});

app.post('/client', function(req, res) {
    db.clients.save(req.body, function(err, res){
        if(err) return console.log(err);
    });
    res.redirect('/');
});

app.post('/clients/filter', function(req, res) {
    var filter = {};

    var name = req.body.name;
    if(name != '') {
        filter.name = name;
    }

    var email = req.body.email;
    if(email != '') {
        filter.email = email;
    } 

    var requests = req.body.requests;
    if(requests != '') {
        filter.requests = requests;
    }
    
    var dump = db.clients.find(filter).toArray(function(err, result) {
        if(err) return console.log(err);
        res.render('index.ejs', { clients : result })
    });
});

app.get('/clients/delete', function(req, res) {
    var email = req.query.email;
    var name = req.query.name;
    db.clients.remove({ email : email, name : name }, function(err, result){
        if(err) return console.log(err);
    });
    res.redirect('/');
});
