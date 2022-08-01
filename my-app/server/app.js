var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var signUpRouter = require('./controllers/signUp');
var signInRouter = require('./controllers/signIn');
var interactionController = require('./controllers/interactionController');
var matchController = require('./controllers/matchController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/interaction', interactionController);
app.use('/match', matchController);
app.use('/signUp', signUpRouter);
app.use('/signIn', signInRouter);

module.exports = app;
