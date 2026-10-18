const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const validation = document.getElementById("validation");
const tokenFake = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

let login = {
    emailObj: email.value,
    passwordObj: password.value
};

function inputValidation(input){
    return input.value.trim() !== "";
}

function tokenValidation(token){
    if(token == tokenFake){
        return true;
    }
    return false;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputValidation(email)) {
        validation.textContent = "Preencha o email.";
        return;
    }

    if (!inputValidation(password)) {
        validation.textContent = "Preencha a senha.";
        return;
    }

    const login = {
        emailObj: email.value,
        passwordObj: password.value,
        token: tokenFake
    };

    localStorage.setItem("login",JSON.stringify(login));

    window.location.replace("area.html");
    validation.textContent = "Tudo certo!";
});