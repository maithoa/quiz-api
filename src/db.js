var mongoose = require('mongoose');
var DB_URI = 'mongodb://admin:x6JDdL@ds119736.mlab.com:19736/quizdb'
mongoose.connect(DB_URI, { useNewUrlParser: true } );