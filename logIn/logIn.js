
function logOn(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    login(password,email,username);
}
   

function login(password,email,username){
    const data = {'password':password,
                    'email':email,
                  'userName':username,
                }; 
    console.log(data);
    fetch('https://login-pgktbhms6a-uc.a.run.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //turns the object to a string
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        if(d.message != "Log in successful"){
            alert(d.message);
            return;
        }
        localStorage.setItem('jwToken-access',d.access_token);
        localStorage.setItem('jwToken-refresh',d.refresh_token);
        localStorage.setItem('username', d.user.userName);
        localStorage.setItem('email',d.user.email);
        localStorage.setItem('age',d.user.age);
        localStorage.setItem('firstName',d.user.firstName);
        localStorage.setItem('lastName',d.user.lastName);
        localStorage.setItem("SwiftUserSignedIn", true);
        localStorage.setItem("logOut",false);
        localStorage.setItem("landing", false);
        document.getElementById("loginPage").style = "display:none;";
        document.getElementById("loginPage2").style = "display:block;";
        loggedin();
    })
    .catch(error => {
        console.error('Error Signing in', error);
    });
}


function loggedin(){
    if(localStorage.getItem("SwiftUserSignedIn") === 'true'){
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").href = "/landing/landing.html";
        document.getElementById("temp").name = "logOut";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
}
window.onload = loggedin;
