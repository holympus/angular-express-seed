var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , passportLocalMongoose = require('passport-local-mongoose')
  , Company = require('./company');

var UserSchema = new Schema({
	    company: {type: ObjectId, ref: 'Company'},
	    first_name: String,
	    last_name: String,
	    email_verification_code: String,
	    email_verified: { type: Boolean, default: false},
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);