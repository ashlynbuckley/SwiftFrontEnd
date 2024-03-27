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
    
        // Update input boxes
        if (localStorage.getItem('email') !== 'none') {
            document.getElementById('userEmail').value = localStorage.getItem('email');
        } else {
            document.getElementById('userEmail').value = "No email found.";
        }
        
        if (localStorage.getItem('password') !== 'none') {
            document.getElementById("password").value = localStorage.getItem('password');
        } else { 
            document.getElementById("password").value = "No password found.";
        }
        
        if (localStorage.getItem('age') !== 'none') {
            document.getElementById("dob").value =localStorage.getItem('age');
        } else {
            document.getElementById("dob").value = "No age found.";
        }
    
        if (localStorage.getItem('firstName') !== 'none') {
            document.getElementById("fname").value = localStorage.getItem('firstName');
        } else {
            document.getElementById("fname").value = "No name entered.";
        }
    
        if (localStorage.getItem('lastName') !== 'none') {
            document.getElementById("lname").value = localStorage.getItem('lastName');
        } else {
            document.getElementById("lname").value = "No name entered.";
        }
    });


function attemptDeletion() {
    var userInput = prompt("Enter your password:");
    var correctPassword = localStorage.getItem('password');

    if (userInput != null) {
        //"123" will eventually be the actual password - this is for testing purposes
        if (userInput === correctPassword) {
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
        if (response.ok == 200) {
          throw new Error('Network response was not ok');
        }
        window.location.href='/landing/landing.html';
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

        if (localStorage.getItem('lastName') !== 'none') {
            document.getElementById("lname").value = localStorage.getItem('lastName');
        }
        
        if (localStorage.getItem('firstName') !== 'none') {
            document.getElementById("fname").value = localStorage.getItem('firstName');
        }
        
        location.reload();
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

        if (localStorage.getItem('email') !== 'none') {
            document.getElementById('userEmail').value = localStorage.getItem('email');
        }
        if (localStorage.getItem('password') !== 'none') {
            document.getElementById("password").value = localStorage.getItem('password');
        }
        if (localStorage.getItem('age') !== 'none') {
            document.getElementById("dob").value =localStorage.getItem('age');
        } 

        location.reload();
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


