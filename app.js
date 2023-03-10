const dotenv = require('dotenv');
const createError = require('http-errors');
const express = require('express');
const i18n = require('i18n-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const app = express();

dotenv.config();
const dbConnect = require('./src/config/db/connect');

dbConnect();

app.use(i18n({
  translationsPath: path.join(__dirname, './src/app/i18n'),
  siteLangs: ['en', 'vi'],
  textsVarName: 'translation',
  defaultLang: ['en'],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(cors());
app.use(session({
  secret: 'pass123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use('/api', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
