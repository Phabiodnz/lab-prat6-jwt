const tokenFake =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

const token = localStorage.getItem("token");
const secret = document.getElementById("secret-message");

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
    // Verifica se o token não existe
    if (token === null || token === undefined) {
        return false;
    }

    // Verifica se o token é uma string ou se tá vazio
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
        //Usa a função criada anteriormente pra verificar a parte do payload
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

function showSecretMessage() {
    if (validateJWT(token)) {
        secret.textContent = "MY-SECRET-KEY";
    } else {
        secret.textContent = "ACESSO NEGADO";
    }
}

showSecretMessage();