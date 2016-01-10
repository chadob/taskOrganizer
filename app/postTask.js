function postTask(description, task, user, listObject) {
		listObject[user][task] = description;
}
module.exports = postTask;