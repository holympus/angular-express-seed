var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , Company = require('./company')
  , Question = require('./question')

var PositionSchema = new Schema({
	    company: {type: ObjectId, ref:'Company'},
	    title: String,
	    hired_state: String,
	    department: String,
	    questions: [{ type: ObjectId, ref: 'Question' }],
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('Position', PositionSchema);