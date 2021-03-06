require('dotenv').config();
const createError       = require('http-errors');
const express           = require('express');
const path              = require('path');
const cookieParser      = require('cookie-parser');
const logger            = require('morgan');
const exphbs            = require('express-handlebars');
const debug             = require('debug')('ninjas-node:server');
const helmet            = require('helmet');

const indexRouter       = require('./routes/index');
const guildsRouter      = require('./routes/guild');
const membersRouter     = require('./routes/members');
const leaguesRouter     = require('./routes/league');
const eventTypesRouter  = require('./routes/event_types');
const eventsRouter      = require('./routes/events');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

// Routes
// define default routes and managed by routers/controllers
app.use('/', indexRouter);
app.use('/api/members', membersRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/leagues', leaguesRouter);
app.use('/api/event_types', eventTypesRouter);
app.use('/api/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: res.locals.message });
});

module.exports = app;

// Check environment
debug('Environment: ' + process.env.NODE_ENV);
