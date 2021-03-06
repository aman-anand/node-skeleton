var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
// app.use(require('./lib/jwtHelper').middleware())
//load db

const _ = require('./lib/Database/mongoConn1').then(k=>{

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(require('./main.router'));
    app.use(require('./api/utils/errorHandler'))
    console.log("Now accepting api calls");
}).catch(e => {
    console.log('caught', e);
    process.exit();
})

module.exports = app;
