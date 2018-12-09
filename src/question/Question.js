var mongoose = require('mongoose');  
var QuestionSchema = new mongoose.Schema({  
  question: {type:String, trim:true, minlength: 1},
  choices: { type: [String], default: null } ,
  answer: {type:String, trim:true, minlength: 1}
});
mongoose.model('Question', QuestionSchema);

module.exports = mongoose.model('Question');