// Symetric Encryption ( XOR Cypher )

function xorEncrypt (plainText, key) {
    if (!plainText || !key) return null;
    let cipherText = '';
    for (let i = 0; i < plainText.length; i++) {
        const keyChar= key.charCodeAt(i % key.length);
        const plainChar = plainText.charCodeAt(i);
        cipherText += String.fromCharCode(keyChar ^ plainChar);
    }
    return cipherText
}

function xorDecrypt (cipherText, key) {
    if (!cipherText || !key) return null;
    return xorEncrypt(cipherText, key);
}

const key = '-----';
const message = 'Hello, my name is John Doe';

const encrypted = xorEncrypt(message, key);
console.log("Encrypted: ", btoa(encrypted));

const decrypted = xorDecrypt(encrypted, key);
console.log("Decrypted", decrypted)