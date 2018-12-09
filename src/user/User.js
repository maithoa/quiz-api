var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  latestScored: { type: Number, default: 0 }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');