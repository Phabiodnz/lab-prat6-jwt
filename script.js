const form = document.getElementById("login-form");
const email = document.getElementById("email")
const password = document.getElementById("password")
const validation = document.getElementById("validation");

function inputValidation(input){
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

    validation.textContent = "Tudo certo!";
});