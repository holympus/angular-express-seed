var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.Schema({
	    first_name: String,
	    last_name: String,
	    phone: String,
	    email_verification_code: String,
	    email_verified: { type: Boolean, default: false},
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);