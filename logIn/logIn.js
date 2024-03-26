
function logOn(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    login(email,password);
}
   

function login(password,email){
    const data = {'password':password,
                    'email':email
                }; 
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
        const jwToken = d.token;
        localStorage.setItem('jwToken',jwToken);
        localStorage.setItem("SwiftUserSignedIn", true);
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
        document.title = localStorage.getItem("username")+" | Swift";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.title = "Log In | Swift";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
}
window.onload = loggedin;