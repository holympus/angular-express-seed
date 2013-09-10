var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var AnswerSchema = new Schema({
  value: String,
  survey: ObjectId,
});

mongoose.model('Answer', AnswerSchema);
