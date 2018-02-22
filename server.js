// grab the packages we need
var express = require('express');
var _ = require('lodash');
var dotenv = require('dotenv');
var passport = require('passport')    
var BasicStrategy = require('passport-http').BasicStrategy

var app = express();
var port = process.env.PORT || 8080;
dotenv.load();

var UNIQUE_KEY = process.env.UNIQUE_KEY;

// BasiaAuth
passport.use(new BasicStrategy(
    function(username, password, done) {
        if (username.valueOf() === '123' &&
            password.valueOf() === '321')
            return done(null, true);
        else
            return done(null, false);
    }
));

// routes will go here
// get method
app.get('/gets', function(req, res) {
    console.log(req.headers);
    if (_.isEmpty(req.query)) {
        res.json({
            message: "no params"
        });
    } else {
        const payload = _.assign({}, req.query, req.headers);
        payload.UNIQUE_KEY = UNIQUE_KEY;
        res.json(payload);
    }
});

// post method
app.post('/posts', function(req, res) {
    if (_.isEmpty(req.query)) {
        res.json({
            message: "no params"
        });
    } else {
        const payload = _.assign({}, req.query, req.headers);
        payload.UNIQUE_KEY = UNIQUE_KEY;
        res.json(payload);
    }
});

// put method
app.put('/puts', function(req, res) {
    if (_.isEmpty(req.query)) {
        res.json({
            message: "no params"
        });
    } else {
        const payload = _.assign({}, req.query, req.headers);
        payload.UNIQUE_KEY = UNIQUE_KEY;
        res.json(payload);
    }
});

// delete method
app.delete('/deletes', passport.authenticate('basic', { session: false }), function(req, res) {
    if (_.isEmpty(req.query)) {
        res.json({
            message: "no params"
        });
    } else {
        const payload = _.assign({}, req.query, req.headers);
        payload.UNIQUE_KEY = UNIQUE_KEY;
        res.json(payload);
    }
});

app.all('/', function (req, res, next) {
    res.json({
        message: "Server doesn't supprot this HTTP request"
    });
    // next() // pass control to the next handler
});

app.use(function(req, res) {
    res.status(404).json({
        message: "request rejected"
    });
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);