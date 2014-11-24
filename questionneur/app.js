var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
//var db = require('./lib/db');
//var mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'hello world'}));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
 * Experimentations
 */

//mongoose.connection.on('open', function (ref) {
//  console.log('Connected to mongo server.');
//  var tableauNbrQ = [];
//	
//	// Callback Hell
//	// TODO: apprendre à utiliser correctement async et refactoriser tout ça !!!
//	db.obtenirNbrQuestionParDomaine("HTML", function(err, compte) {
//	  if (err) return console.error(err);
//	  tableauNbrQ.push(compte);
//	  db.obtenirNbrQuestionParDomaine("CSS", function(err, compte2) {
//	    if (err) return console.error(err);
//	    tableauNbrQ.push(compte2);
//	    db.obtenirNbrQuestionParDomaine("JS", function(err, compte3) {
//	      if (err) return console.error(err);
//	      tableauNbrQ.push(compte3);
//	      console.log(tableauNbrQ);
//	    });
//	  });
//	});

//});


//db.connect();
	
//console.log(db.obtenirQuestionParId("54701d68adbb466710ff875d"));




module.exports = app;
