var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
//var db = mongojs('participantlist', ['participantlist', 'jpsychdata']);
var databaseUrl = "mydb"; // "username:password@example.com/mydb"
//var collections = ["participantlist", "jpsychdata"]
var collections = ["datacollected"]
var db = require("mongojs").connect(databaseUrl, collections)
var bodyParser = require('body-parser');

//var currentParticipantID = "";

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());


app.get('/index', function (req, res) {
	//console.log("I received a get request for '/index' page");
});

app.get('/experiment', function (req, res) {
	//console.log("I received a get request for '/experiment' page");
});

app.get('/contact', function (req, res) {
	//console.log("I received a get request for '/contact' page");
});


/* Requests for '/participate' */
app.get('/participate', function (req, res) {
	//console.log("I received a get request for '/participate' page");
	console.log(req.body);
	/* */
	db.datacollected.find(function (err, docs) {
		res.json(docs);
	});
});

app.post('/participate', function (req, res) {
//	console.log("I received a post request for '/participate' page");
	db.datacollected.insert(req.body, function(err, doc) {
		console.log("This participant was inserted to db.datacollected: " + res.json(doc));
	});
})

app.post('/experiment', function (req, res) {
//	console.log("I received a post request for '/experiment' page"+ req);
	db.datacollected.insert(req.body, function(err, doc) {
		console.log("This experiment data was inserted to db.datacollected: " + res.json(doc));
	});
});
/* ---- Requests for '/participate' ---- */


app.listen(3000);
console.log("Server running at port 3000");