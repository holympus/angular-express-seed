var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  AnswerSchema = mongoose.AnswerSchema;

var AnswerSetSchema = new Schema({
  title: String,
  answers: [AnswerSchema],
  created: Date
});

mongoose.model('AnswerSet', AnswerSetSchema);
