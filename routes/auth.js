var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , passportLocalMongoose = require('passport-local-mongoose')
  , User = require('../models/user')
  , flash = require('connect-flash');

mongoose.connect('mongodb://localhost/gnopher-development');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.login =
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/login',
                                   failureFlash: true });

exports.logout = function(req, res) {
	req.logout()
	return res.redirect('/');
};