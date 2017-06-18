var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
  console.log('MongoDB connected'); 
});

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  "id": Number, 
  "name": String, 
  "full_name": String, 
  "size": Number
});


var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;







// var kittySchema = mongoose.Schema({
//   name : String
// }); 

// kittySchema.methods.speak = function () {
//   var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
//   console.log(greeting); 
// }

// var Kitten = mongoose.model('Kitten', kittySchema );

// var silence = new Kitten ({ name: 'Silence'}); 
// console.log(silence.speak()); 

