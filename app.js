
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

function IsAuthenticated(req,res,next){
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
app.get('/register', function(req, res) {
        res.render('register', {action: 'register'});
    });
// JSON API
app.get('/api/name', api.name);

app.get('/api/login', IsAuthenticated, function (req, res, next) {
	res.json({ "success": "true", "username": req.user.username, "first_name": req.user.first_name })
	
	});

app.get('/api/candidates', IsAuthenticated, function (req, res, next) {
  Candidate.find({'company':req.user.company}).populate('position').exec(function(err, candidates) {
    res.json({'candidates': candidates});  
  });
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.json({ "success": "true", "first_name": req.user.first_name })
    });

app.delete('/api/login', function(req, res) {
        req.logout();
        res.json({ "success": "true"})
    });

app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


app.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username, first_name: req.body.first_name }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.json({ "success": "false", "errorMsg": err.message })
        }
		var email_verification_code = Math.random().toString(36).substr(2,16);
		user.email_verification_code = email_verification_code;
		user.save(function (err) {
   		 if (err) return handleError(err);
    	 	return res.json({ "success": "false", "errorMsg": "User could not be saved." })
  		});
		//postmark.send({
        //"From": "notifications@crushthewod.com", 
        //"To": user.username, 
        //"Subject": "Email Confirmation", 
        //"TextBody": "Hello! Please confirm your email by clicking this link: http://54.241.9.166:3000/verifyemail/?v=" + email_verification_code
    //});
        res.json({ "success": "true" })
    });
});

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
