var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema

var CompanySchema = new Schema({
	    name: String,
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('Company', CompanySchema);