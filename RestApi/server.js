var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Cors : Authorize request from another domain (here, AngularJs GUI)
// Web link : https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Examples from another web link.... but it works
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})




app.get('/listText', function (req, res) {
   fs.readFile( __dirname + "/" + "json.txt", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})



var port = process.env.PORT || 8081;


// start the server
var server = app.listen(port, () => {

	var host = server.address().address
	port = server.address().port
	console.log('Server started! At http://localhost:' + port);

});
