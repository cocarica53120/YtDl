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




//https://www.youtube.com/watch?v=klS5bqrxve8
app.get('/api/downloads', function(req, res) {
  console.log('get downloads');
  var link = req.param('link');
  console.log(link)
  fs.readFile( __dirname + "/../" + "downloads.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
  //res.send('GET DOWNLOAD LINK: ' + link);
});

var current_link;

app.post('/api/downloads', function(req, res) {
  console.log('post downloads');
  var link = req.body.link;
  console.log('link', link)
  //fs.writeFile( __dirname + "/../" + "downloads.json", link, 'utf8', function (err) {
  fs.appendFile( __dirname + "/../" + "downloads_post.json", link + '\n', 'utf8', function (err) {
    //if (err) throw err;
    if (err) {
      res.end('the HAS NOT been saved!!!!!');
    } else {
      console.log('the file has been saved');
      current_link = link;
      res.end('POST DOWNLOAD LINK: ' + current_link);
    }
  });

});


const download = require('./download.js');
const downloader = new download.Downloader();

// Launch of Downloader
app.post('/api/start_download', function(req, res) {
	console.log('/api/start_download. req=', req);
  res.send(`note: process launched\n`);
	const link = req.body.link;
	const status = downloader.download(link);
	console.log('status from download()', status);
	
});


// Status of Downloader
app.get('/api/status_download', function(req, res) {
		const status = downloader.status();
		res.end(status);
});



var port = process.env.PORT || 8081;


// start the server
var server = app.listen(port, () => {

  var host = server.address().address
  port = server.address().port
  console.log('Server started! At http://localhost:' + port);

});
