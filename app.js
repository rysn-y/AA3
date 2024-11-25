var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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



require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ryanye:gcdEd8qxge70lvSe@a3.gfyrf.mongodb.net/?retryWrites=true&w=majority&appName=a3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));



const tasksRouter = require('./routes/tasks'); // Import tasks routes

  require('dotenv').config(); // Load environment variables
// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

app.set('view engine', 'ejs'); // EJS as the view engine
app.set('views', './views'); // views directory

// Routes
app.use('/tasks', tasksRouter); 




module.exports = app;



