var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 3001;
var taskDescriptions = require('./app/taskDescriptions.js');
var taskdescriptions = new taskDescriptions;
var Accounts = require('./app/accounts.js');
var accounts = new Accounts;
var postTask = require('./app/postTask.js');
app.use(express.static(__dirname + '/app/'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});
app.get("/accounts", function(req,res) {
res.json(accounts);
});
app.post('/accounts', function(req, res) {
	var account = postTask(req.body.description, req.body.task, accounts);
	res.json(accounts);
})

app.get("/taskDescriptions", function(req,res) {
	res.json(taskdescriptions);
})
app.post('/taskDescriptions', function (req, res) {
	if (req.body.hasOwnProperty("task")) {
		var task = postTask(req.body.description, req.body.task, taskdescriptions);
		res.json(task);
	} else {
		var propName = Object.getOwnPropertyNames(req.body);
		propName = propName[0].toString();
		delete taskdescriptions[propName];
		res.json(taskdescriptions);
	}
})
app.listen(port, function() {
	console.log('server started on port ' + port);
});