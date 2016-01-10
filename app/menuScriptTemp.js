$(function() {
//switch active tasks, bring up description in taskDescription
	$('.list').on('click', '.listItem', function() {
		var $this = $(this);
		if (!($this.hasClass('active'))) {
			$('.listItem.active').removeClass('active');
			$this.addClass('active');
			var chad = "chad";
			$.get('http://localhost:3001/taskDescriptions', function(response) {
				$('#textArea').val(response[$this.attr('id')]);
			});
		}
	});

//code for adding new item
  var $newItemButton = $('#newItemButton');
  var $newItemForm = $('#newItemForm');
  $newItemForm.hide();
  $('#showForm').on('click', function(){
    $newItemButton.hide();
    $newItemForm.show();
  });

  $newItemForm.on('submit', function(e) {
  	var $taskName = $('#itemDescription');
    e.preventDefault();
    var newText = $taskName.val();
    $.get('taskDescriptions', function(getRes) {
			if (getRes.hasOwnProperty(newText)) {
    		alert("That taskname is already taken.");
    	} else {
    		$('.listItem').last().after('<div class="listItem listItemAfter bob" id="' + newText + '"> <span class="listItemText">' + newText + '</span> <button class="removeTask"> x </button> </div>');
    		$newItemForm.hide();
    		$newItemButton.show();
    		$taskName.val('');
    	}
    });
  });
//code for removing item
	$('.list').on('click', '.removeTask', function() {
		var $this = $(this);
		var $identity = $this.parent().attr('id');
		$this.parent().remove();
		$('#textArea').val("");
		$.post('taskDescriptions', $identity, function(response) {
		});
	});

//code for adding new accounts
  var $logoutButton = $('#logoutButton');
  var $createAccount = $('#createAccount');
  var $loginForm = $('#loginForm');
  $logoutButton.hide();
  $createAccount.hide();
	$('a').on('click', function(e) {
		e.preventDefault();
		$loginForm.hide();
		$createAccount.show();
	});

	$('#newAccount').on('submit', function(e) {
		e.preventDefault();
		var $newUsername = $('#newUsername').val();
		var $newPassword = $('#newPassword').val();
		var userAndPass = {task: $newUsername, description: $newPassword}
		$.get('accounts', function(getRes) {
			if (getRes.hasOwnProperty($newUsername)) {
				alert("That username already exists in our database");
			} else {
				$.post('accounts', userAndPass, function(response) {
				});
				alert("Your account has been created");
				$createAccount.hide();
				$loginForm.show();
			}
		});
	});
//code for logging in
	$loginForm.on('submit', function(e) {
		e.preventDefault();
		var $username = $('#username').val();
		var $password = $('#password').val();
		$.get('accounts', function(getRes) {
			if (getRes.hasOwnProperty($username) && getRes[$username] == $password) {
				$loginForm.hide();
				$logoutButton.show();
				$('#welcome').html("Welcome " + $username);
			} else {
				alert("The login information does not match our records");
			}
		});
	});

//code for taskDescription
	var $descriptionForm = $('#descriptionForm');
	$descriptionForm.click(function(event) {
		$(this).data('clicked', (event.target));
	});
	$descriptionForm.on('submit', function(e) {
		e.preventDefault();
		var $textInput = $('#textArea');
		var newText = $textInput.val();
		if ($(this).data('clicked').id === ('save')) {
			var currList = $('.listItem.active').attr('id');
			var taskAndDescription = {task: currList, description: newText}
			$.post('taskDescriptions', taskAndDescription, function(response) {	
			});
		} else {
			$('#textArea').val("");
		} 
	});
});