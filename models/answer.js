var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var AnswerSchema = new Schema({
	    author: {type: ObjectId, ref: 'User'},
	    about: {type: ObjectId, ref: 'Candidate'},
	    question: {type: ObjectId, ref: 'Question'},
	    answer_text: String,
	    deleted: { type: Boolean, default: false },
	    created_at: { type: Date, default: Date.now }
	    updated_at: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('Answer', AnswerSchema);