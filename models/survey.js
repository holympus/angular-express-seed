var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SurveySchema = new Schema({
  title: String,
  category: String,
  questions: [{text: String, question_type: String }]
});

mongoose.model('Survey', SurveySchema);
