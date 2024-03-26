//dynamic navbar
window.onload = function loggedin() {
    
    if (localStorage.getItem("SwiftUserSignedIn") === 'true') {
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").href = "/landing/landing.html";
        document.getElementById("temp").name = "logOut";
        document.title = localStorage.getItem("username") + " | Swift";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.title = "Home | Swift";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }

    if(localStorage.getItem("landing") === 'false'){
        loggedOut();
    }
}

function loggedOut() {
    if(document.getElementById("temp").name == "logOut"){   
        localStorage.setItem("logOut",true);
        localStorage.setItem("landing",true);
    }

    if (localStorage.getItem("logOut") === 'true' && localStorage.getItem("landing") === 'true') {
        document.getElementById("temp").href = "#";
        document.getElementById("loggedOut").style = "display:block;z-index:100000;position:absolute;";
        document.getElementById("All").style = "opacity:.5;";
    }
    else{
        return;
    }
}

function logOut(){
    localStorage.setItem("username", "none");
    localStorage.setItem("email","none");
    localStorage.setItem("SwiftUserSignedIn",false);
    localStorage.setItem("logOut",false);
    document.getElementById("All").style = "opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    loggedin();
}

function stayIn(){
    document.getElementById("All").style="opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    document.getElementById("temp").href = "/landing/landing.html";
    localStorage.setItem("logOut",false);

}

