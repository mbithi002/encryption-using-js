// Asymmetric Encryption (Mini RSA)

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(e, phi) {
    let [m0, x0, x1] = [phi, 0, 1];
    while (e > 1) {
        let q = Math.floor(e / phi);
        [e, phi] = [phi, e % phi];
        [x0, x1] = [x1 - q * x0, x0];
    }
    return (x1 + m0) % m0;
}

function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

const p = 61;
const q = 53;
const n = p * q; 
const phi = (p - 1) * (q - 1); 
const e = 17; 
const d = modInverse(e, phi);

function encryptRSA(plaintext, publicKey) {
    const [e, n] = publicKey;
    const chars = plaintext.split('');
    return chars.map(c => modPow(c.charCodeAt(0), e, n));
}

function decryptRSA(ciphertext, privateKey) {
    const [d, n] = privateKey;
    return ciphertext.map(c => String.fromCharCode(modPow(c, d, n))).join('');
}

const publicKey = [e, n,];
const privateKey = [d, n];

const plaintext = "Hi, my name is Lucky Mbithi";
const encryptedRSA = encryptRSA(plaintext, publicKey);
console.log("Encrypted:", encryptedRSA);

const decryptedRSA = decryptRSA(encryptedRSA, privateKey);
console.log("Decrypted:", decryptedRSA);