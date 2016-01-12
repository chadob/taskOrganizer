var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 3001;
var taskDescriptions = require('./app/taskDescriptions.js');
var taskdescriptions = new taskDescriptions;
var Accounts = require('./app/accounts.js');
var accounts = new Accounts;
var postTask = require('./app/postTask.js');
var postAccount = require('./app/postAccount.js');
var postAccountTask = require('./app/postAccountTask');
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
	var account = postAccount(req.body.description, req.body.task, accounts);
	res.json(accounts);
})

app.get("/taskDescriptions", function(req,res) {
	res.json(taskdescriptions);
})
app.post('/taskDescriptions', function (req, res) {
	if (req.body.hasOwnProperty("task")) {
		var task = postTask(req.body.description, req.body.task, req.body.user, taskdescriptions);
		res.json(task);
	} else if (req.body.hasOwnProperty("taskList")){
		var userTask = postAccountTask(req.body.taskList, req.body.username, taskdescriptions);
		res.json(userTask);
	} else {
		delete taskdescriptions[req.body.username][req.body.taskToDo];
		res.json(taskdescriptions);
	}
});
app.listen(port, function() {
});