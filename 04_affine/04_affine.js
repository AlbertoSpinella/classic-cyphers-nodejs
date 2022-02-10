import { decrypt } from "./common.js";

const encrypt = (cleartext, k1, k2) => {
    if (k1 % 13 == 0 || k1 % 2 == 0)
        throw new Error("k1cannot be divisor of 26");
    const adaptedCleartext = cleartext.toUpperCase();
    let result = "";
    for (const char of adaptedCleartext) {
        const decimal = char.charCodeAt(0);
        if (decimal < 65 || decimal > 90) result += char;
        else {
            const product = parseInt((decimal - 65) * k1) + parseInt(k2);
            const rotated = ((product) % 26) + 65;
            result += String.fromCharCode(rotated);
        }
    }
    return result;
};

const main = () => {
    const mode = process.argv[2];
    if (!mode || (mode != "e" && mode != "d"))
        throw new Error("Invalide mode.\ne to encrypt\nd to decrypt");
    
    const input = process.argv[3];
    if (!input) throw new Error("Invalid input");

    const k1 = process.argv[4];
    const k2 = process.argv[5];
    if (!k1 || !k2 || isNaN(k1) || isNaN(k2)) throw new Error("Invalid k1 or k2");

    if  (mode == "e") {
        console.log(`Cleartext:\t${input}`);
        const encrypted = encrypt(input, k1, k2);
        console.log(`Ciphertext:\t${encrypted}`);
    } else {
        console.log(`Ciphertext:\t${input}`);
        const decrypted = decrypt(input, k1, k2);
        console.log(`Cleartext:\t${decrypted}`);
    }
};

main();