const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotEnv = require("dotenv");
dotEnv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRoutes');
const drinksRouter = require('./routes/drinksRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const glassRouter = require('./routes/glassRoutes');
const ingredientRouter = require('./routes/ingredientRoutes');
const allRouter = require('./routes/allRoutes');

const relate = require("./database/relationships");

const app = express();
relate();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this is a simulation of api keys stored in some database

const API_KEYS = ["1", "2", "3", "4", "5"];

// ion know what this one below does
// app.use(function(req, res, next) {
//   console.log(`${new Date().toTimeString()}     ${req.originalUrl}`);
//   next();
// })

// this is a middle-ware that make sures u have an api key. read middle wares

app.use(function (req, res, next) {
  const {apikey}  = req.query;
  const key = req.get("x-api-key");
  if(API_KEYS.includes(apikey) || API_KEYS.includes(key)) { // the second option is to check the x-api-key value on postman header section
    next(); // this calls the next function to be ran
  } else {
    res.send("acces denied").statusCode(403); // this like the res.status(403) error codes
  }
});

// middle ware ends here

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);
app.use('/categories', categoriesRouter);
app.use('/glasses', glassRouter);
app.use('/ingredients', ingredientRouter);
app.use('/all', allRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
