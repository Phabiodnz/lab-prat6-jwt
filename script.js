const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const validation = document.getElementById("validation");

const tokenFake =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

function inputValidation(input) {
    return input.value.trim() !== "";
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

    localStorage.setItem("token", tokenFake);

    validation.textContent = "Tudo certo! Redirecionando...";
    
    setTimeout(() => {
        window.location.replace("area.html");
    }, 800);
});