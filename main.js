
//dynamic navbar
function loggedin(){
    if(localStorage.getItem("SwiftUserSignedIn") === 'true'){
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").href = "/landing/landing.html";
        document.getElementById("temp").name = "logOut";
        document.getElementById("home").innerHTML = localStorage.getItem("username")+" | Swift";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.getElementById("home").innerHTML = "Home | Swift";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
}
window.onload = loggedin ;

function loggedOut(){
    if(document.getElementById("temp").name === "logOut"){
        document.getElementById("temp").href = "#";
        document.getElementById("loggedOut").style ="display:block;z-index:100000;position:absolute;";
        document.getElementById("All").style = "opacity:.5;";
        console.log("sign up page");
    }
}

document.getElementById("yes").addEventListener('click',function(event){
    localStorage.setItem("username",null);
    localStorage.setItem("SwiftUserSignedIn",false)
    document.getElementById("All").style="opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    loggedin();
    document.getElementById("temp").href = "signUp.html";
})
document.getElementById("no").addEventListener('click',function(event){
    document.getElementById("All").style="opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    document.getElementById("temp").href = "landing.html";
})
