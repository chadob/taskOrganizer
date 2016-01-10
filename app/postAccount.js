function postAccount(password, user, listObject) {
		listObject[user] = password;
}
module.exports = postAccount;