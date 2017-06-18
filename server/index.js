var express = require('express');
var bodyParser = require('body-parser');
var fakeData = require('./fakeData');
var app = express();
var repo = require('../database/index.js')
var http = require("http");
var https = require("https");
var request = require('request');
var config = require('./config')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(bodyParser.json()); 

// STEP 1 
// get github api data the sameple  (use sample data as fake data)
// and send the data to the client
// render top 25 repos on the borswers 


// STEP 2 
// when client send a post request
// check if we have username in database 
// otherwise access github api with the username 
// send the data back to the client 
 
// var headers = {
//   'Access-Control-Allow-Origin' : "*"
// }
// console.log( config.key)
app.post('/repos/import', function (req, res) {
  // console.log(req.url);
  var string = ''; 
  req.on('data', function(chunk) {
    // console.log('chunk: ', chunk.toString());
    string = chunk.toString();
  });

  req.on('end', function () {

    var options = {
      url: 'https://api.github.com/users/' + string +'/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': config.key
      }
    };
    // console.log('KEY LOOK', config.key)
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse( response.body );
      } else {
        console.error(response.body); 
      }
      // console.log(response.body);
      // console.log('responseBODY',response.body);
      var responseData= JSON.parse(response.body)
      for (var i = 0; i < responseData.length; i++) {
        // if(i === 0) {
        //   console.log(responseData[0]);
        // }
        // console.log('STRINGGGGG',response.body[0] );
        var reposSchema = new repo({'id': responseData[i].id, 'name': responseData[i].name, 'full_name': responseData[i].full_name, 'size': response.body[i].size }); 
        // console.log(reposSchema);
        reposSchema.save(); 
      }
    }
    request(options, callback);
    res.send('hello world');
  });
  // end(send) / statusCode 
      // ( client  -> next step -> GET )
});











// .sort({ 'size': -1 })

app.get('/repos', function (req, res) {
  // TODO
  repo.find({}).limit(125).exec(function (err, result) {
    if( err ) {
      console.log(err)
    } else {
      console.log(result);
      res.end(JSON.stringify(result)); 
    }
  })
});



var port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});




