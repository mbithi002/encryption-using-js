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

// Key generation
const p = 61; // small prime
const q = 53; // small prime
const n = p * q; // n = 3233
const phi = (p - 1) * (q - 1); // phi = 3120
const e = 17; // small public exponent

// Calculate private key d
const d = modInverse(e, phi);

// Encrypt function
function encryptRSA(plaintext, publicKey) {
    const [e, n] = publicKey;
    const chars = plaintext.split('');
    return chars.map(c => modPow(c.charCodeAt(0), e, n));
}

// Decrypt function
function decryptRSA(ciphertext, privateKey) {
    const [d, n] = privateKey;
    return ciphertext.map(c => String.fromCharCode(modPow(c, d, n))).join('');
}

// Example usage:
const publicKey = [e, n];
const privateKey = [d, n];

const plaintext = "Hi";
const encryptedRSA = encryptRSA(plaintext, publicKey);
console.log("Encrypted:", encryptedRSA);

const decryptedRSA = decryptRSA(encryptedRSA, privateKey);
console.log("Decrypted:", decryptedRSA);