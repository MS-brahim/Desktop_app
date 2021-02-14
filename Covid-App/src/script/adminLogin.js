function checkLogin() {
    let login = document.getElementById("login").value;
    let loginErr = document.getElementById("loginErr");
    if (login === "") {
        loginErr.innerHTML = "please fill out this field ";
    } else {
        loginErr.innerHTML = " ";
    }
}

function checkPassword() {
    let password = document.getElementById("password").value;
    let passwdErr = document.getElementById("passwdErr");

    if (password === "") {
        passwdErr.innerHTML = "please fill out this field ";
    } else {
        passwdErr.innerHTML = " ";
    }
}

function check() {
    let login = document.getElementById("login").value;
    let loginErr = document.getElementById("loginErr");
    let password = document.getElementById("password").value;
    let passwdErr = document.getElementById("passwdErr");

    let user_name = "admin";
    let user_password = "admin";
    
    if (login !== user_name) {
        loginErr.innerHTML = "please fill out this field ";
    } else if (password !== user_password) {
        passwdErr.innerHTML = "please fill out this field ";
    } else {
        loginErr.innerHTML = " ";
        passwdErr.innerHTML = " ";
        window.location.href = '../views/dashboard.html';
    }
}

