var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String
});

mongoose.model('Company', CompanySchema);
