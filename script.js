const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const validation = document.getElementById("validation");

const tokenFake =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

function inputValidation(input) {
    return input.value.trim() !== "";
}

// Decodifica Base64URL
function decodeBase64Url(str) {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

// Validação do Token
function validateJWT(token) {
    // Verifica se o token existe, é uma string e não está vazio
    if (typeof token !== "string" || token.trim() === "") {
        return false;
    }

    // Verifica a estrutura esperada
    const parts = token.split(".");
    // "Corta" o token em 3 partes e verifica se alguma delas tá vazia
    if (parts.length !== 3 || parts.some((p) => p === "")) {
        return false;
    }

    // Verifica se o token pode ser decodificado
    let payloadText;
    try {
        payloadText = decodeBase64Url(parts[1]);
    } catch (error) {
        return false;
    }

    // Verifica se o conteúdo é um json válido
    let payload;
    try {
        payload = JSON.parse(payloadText);
    } catch (error) {
        return false;
    }

    // Verifica se o payload não é um objeto / se é um valor nulo / se é um vetor
    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
        return false;
    }

    // Verifica se o token é o esperado
    if (token !== tokenFake) {
        return false;
    }

    return true;
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

    // Salva o token (sem aspas, para guardar o valor da variável)
    localStorage.setItem("token", tokenFake);

    // Lê de volta o que foi salvo e valida antes de entrar
    const token = localStorage.getItem("token");

    if (!validateJWT(token)) {
        localStorage.removeItem("token");
        validation.textContent = "Token inválido. Não foi possível entrar.";
        return;
    }

    validation.textContent = "Tudo certo! Redirecionando...";

    setTimeout(() => {
        window.location.replace("area.html");
    }, 800);
});