function loadTab(tabChosen) {
    var tabs = document.querySelectorAll('.tabContent'); //gather all the tab content

        //for each tab that is "active" - hide it (by removing active, alters css class)
        tabs.forEach(tab => 
            { tab.classList.remove('active'); }
        );
    
        //get the selected tab from the id passed in
    var selectedTab = document.getElementById(tabChosen);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
    }

    //on load i want it to display profile 
    document.addEventListener('DOMContentLoaded', function () {
        loadTab('profile');
    });

    //show your details in settings
    document.addEventListener("DOMContentLoaded", function() {
        var emailAddress = localStorage.getItem('email');
        var userPassword = localStorage.getItem('password');
        var age = localStorage.getItem('age');
        var firstName = localStorage.getItem('firstName');
        var lastName = localStorage.getItem('lastName');
    
        var emailElement = document.getElementById('userEmail');
        var passElement = document.getElementById("passwordInput");
        var ageElement = document.getElementById("dob");
        var firstNameEl = document.getElementById("fname");
        var lastNameEl = document.getElementById("lname");
    
        // Update input boxes
        if (emailAddress) {
            emailElement.value = emailAddress;
        } else {
            emailElement.value = "No email found.";
        }
        
        if (userPassword) {
            passElement.value = userPassword;
        } else { 
            passElement.value = "No password found.";
        }
        
        if (age) {
            ageElement.value = age;
        } else {
            ageElement.value = "No age found.";
        }
    
        if (firstName) {
            firstNameEl.value = firstName;
        } else {
            firstNameEl.value = "No name entered.";
        }
    
        if (lastName) {
            lastNameEl.value = lastName;
        } else {
            lastNameEl.value = "No name entered.";
        }
    });


function attemptDeletion() {
    var userInput = prompt("Enter your password:");
    var correctPassword = localStorage.getItem('password');

    if (userInput != null) {
        //"123" will eventually be the actual password - this is for testing purposes
        if (userInput == correctPassword) {
            var deleteConfirmation = confirm("Are you sure?");

            //if they do want to del account
            if (deleteConfirmation) {
                deleteAccount();
            } else {
                //user clicked "Cancel" at second confirmation
                alert("Deletion cancelled.");
            }
        } else {//the userInput was not equal to password
            // Incorrect password
            alert("Incorrect password. Account deletion canceled.");
        }
    }
    
}

function deleteAccount() {
    fetch('https://deleteuser-pgktbhms6a-uc.a.run.app/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.href = '/landing/landing.html';
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function updateProfile() {
    fetch('https://updateprofile-pgktbhms6a-uc.a.run.app/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function updateAccount() {
    fetch("https://updateaccount-pgktbhms6a-uc.a.run.app/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

}

//dynamic navbar
function loggedin() {
    if (localStorage.getItem("SwiftUserSignedIn") === 'true') {
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").name = "logOut";
        document.getElementById("temp").href = "/landing/landing.html";
        document.title = localStorage.getItem("username") + " | Swift";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.title = "Timer/Tasks | Swift";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
}
function loggedOut() {
    if (document.getElementById("temp").name === "logOut") {
        localStorage.setItem("logOut",true);
        localStorage.setItem("landing",false);
    }
}

window.onload = loggedin;


