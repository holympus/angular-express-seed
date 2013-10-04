
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash');

var app = module.exports = express();

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
passportLocalMongoose = require('passport-local-mongoose');

var User = require('./models/user'),
    Candidate = require('./models/candidate'),
    Company = require('./models/company'),
    Question = require('./models/question'),
    Position = require('./models/position');

mongoose.connect('mongodb://localhost/gnopher-development');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  //var new_position = new Position({company: mongoose.Types.ObjectId("5244c190c4550d2856000001"), title: "Chief of Idiocy", hired_state: "hiring", department: "Overpaid Mid-level Managers"});
  //new_position.save()
});

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

//error handlilng
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var isAuthenticated = function(req,res,next){
    if(req.user){
        next();
    }
    else{
        res.send(401, {status:401, message: 'Unauthorized'})
    }
}
/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/:subfolder/:name', routes.subpartials);
// app.get('/register', function(req, res) {
//         res.render('register', {action: 'register'});
//     });

// JSON API
//testing
app.get('/api/name', api.name);
app.get('/api/static/*', api.staticJSON);


//LOGIN
app.get('/api/login', api.login.get);
app.post('/api/login', passport.authenticate('local'), api.login.get);
app.delete('/api/login', api.login.del);
app.get('/api/logout', api.login.del);
app.post('/api/register',api.register, passport.authenticate('local'), api.login.get)

//candidates
app.get('/api/candidates', api.candidates);
app.get('/api/candidate/:candidate_id', api.candidate);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);




app.post('/register', api.register);
/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
