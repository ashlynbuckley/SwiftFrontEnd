
//checks if the email is valid
function validateEmail(email){
    //check if there is an @ sign and "."
    //check if there are characters infront and behind the @
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
        // Further actions for a valid email (e.g., submit to a server)
    } else {
       // alert('Invalid email. Please enter a valid email address.');
        alert("Invalid email. Please make sure the following are in your email address: '@'  '.' ");
        return false;
    }
}

function validatePassword(password){
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/;
    if(passwordRegex.test(password)){
        return true;
    }
    else{
        alert("Invalid Password. Please make sure the following are in your Password: 'A-Z'  'a-z' '@$!%*?&' '1-9' and that its between 6 and 50 characters");
        return false;
    }
}   

function validateForm() {
    // Regular expression for basic email validation
    // var emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value
    // Check email format
    if (!validateEmail(email)) {
        console.log("Invalid email");
        return false;
    }

    // Check minimum password length
    if (!validatePassword(password)) {
        console.log("Invalid password");
        return false;
    }

    // If both email and password are valid, submit the form
    return true;
}

function Next1(){
    document.getElementById("Page1").style = "display:none;";
    document.getElementById("Page2").style = "display:block;";   
}
function Next2(){    
    if(validateForm()){
        document.getElementById("Page2").style = "display:none;";
        document.getElementById("Page3").style = "display:block;";
    }
}

function Back1(){
    document.getElementById("Page1").style = "display:block;";
    document.getElementById("Page2").style = "display:none;";
}
function Back2(){
    document.getElementById("Page2").style = "display:block;";
    document.getElementById("Page3").style = "display:none;";
}


document.getElementById("signup").addEventListener('click', function(event) {
    
    // event.preventDefault();
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userName = document.getElementById("username").value;
    let age = document.getElementById("age").value;
    if(age<13){
        alert("You must be over the age of 13");
        return;
    }
    
    signUp(firstName,lastName,email,password,userName,age);
})

function signUp(firstName,lastName,email,password,userName,age){ 
    const data = {//object
        'firstName':firstName,
        'lastName':lastName,
        'email':email,
        'password':password,
        'userName':userName,
        'age':age
    }; 

    fetch('https://signup-pgktbhms6a-uc.a.run.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //turns the object to a string
    })
    .then(response => response.json())
    .then(d => {
        // console.log(d.access_token);
        if(d.message === 'User already exists.'){ //check if the user exists
            alert("user already exists");
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
        
        document.getElementById("done").style = "display:block;";
        document.getElementById("Page3").style = "display:none;";
        loggedin();
    })
    .catch(error => {
        console.log('Error Signing in');
    });
}

setInterval(function refreshToken(refresh_Token){
    fetch('https://refreshtoken-pgktbhms6a-uc.a.run.app/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refresh_Token)
    })
    .then(response => response.json())
    .then(d => {
        localStorage.setItem('jwToken-access',d.access_token);
    })
}
,1800000);

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
        document.title = "Sign Up | Swift";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
    loggedOut;
}

function loggedOut() {
    if (document.getElementById("temp").name === "logOut") {
        window.location.replace("../landing/landing.html");
        document.getElementById("temp").href = "#";
        document.getElementById("loggedOut").style = "display:block;z-index:100000;position:absolute;";
        document.getElementById("All").style = "opacity:.5;";
        console.log("sign up page");
    }
}

window.onload = loggedin;
