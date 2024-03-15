console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if (element !== "slide-up") {
			parent.classList.add('slide-up')
		} else {
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if (element !== "slide-up") {
			parent.classList.add('slide-up')
		} else {
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});


function validateForm() {
	var userName = document.getElementById("userName").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// Basic validation for each field
	if (userName.trim() == "") {
		alert("Please enter your name.");
		return false;
	}

	if (email.trim() == "") {
		alert("Please enter your email.");
		return false;
	} else {
		// Regular expression for email validation
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		}
	}

	if (password.trim() == "") {
		alert("Please enter your password.");
		return false;
	} else if (password.length < 6) {
		alert("Password must be at least 6 characters long.");
		return false;
	}

	// If all validations pass, return true to submit the form
	return true;
}
