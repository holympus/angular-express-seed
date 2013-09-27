var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , Company = require('./company')
  , Position = require('./position');

var CandidateSchema = new Schema({
	    company: {type: ObjectId, ref:'Company'},
	    positions: [{type: ObjectId, ref: 'Position'}],
	    name: String,
	    questions: [{ type: ObjectId, ref: 'Question' }],
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('Candidate', CandidateSchema);