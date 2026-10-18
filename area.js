const tokenFake = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";
const secret = document.getElementById("secret-message");
const loginDados = JSON.parse(localStorage.getItem("login"));

function tokenValidation(token){
    return token === tokenFake;
}

function showSecretMessage(){
    if (tokenValidation(loginDados.token)){
        secret.textContent = "MY-SECRET-KEY";
    } else {
        secret.textContent = "ACESSO NEGADO";
    }
}

showSecretMessage();