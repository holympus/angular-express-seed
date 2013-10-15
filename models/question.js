var mongoose = mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , Company = require('./company')

var QuestionSchema = new Schema({
	    company: {type: ObjectId, ref: 'Company'},
      type: {type: String, default:'text', enum:['text','boolean','rank']},
	    text: String,
	    active: { type: Boolean, default: true },
	    created_at: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('Question', QuestionSchema);