import { decrypt } from "./common.js";

const encrypt = (cleartext, rot) => {
    const adapted = cleartext.toUpperCase();
    let result = "";
    for (const char of adapted) {
        const decimal = char.charCodeAt(0);
        if (decimal < 65 || decimal > 90) result += char;
        else {
            const finalNumber = decimal + rot;
            const rotated = finalNumber <= 90 ? finalNumber : finalNumber % 90 + 64;
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

    let rot = process.argv[4];
    if (!rot || isNaN(rot)) throw new Error("Invalid rot number");
    rot = rot % 26;

    if  (mode == "e") {
        console.log(`Cleartext:\t${input}`);
        const encrypted = encrypt(input, rot);
        console.log(`Ciphertext:\t${encrypted}`);
    } else {
        console.log(`Ciphertext:\t${input}`);
        const decrypted = decrypt(input, rot);
        console.log(`Cleartext:\t${decrypted}`);
    }
};

main();