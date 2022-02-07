const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const removeKeyDoubles = (key) => {
    let result = "";
    for (let i = 0; i < key.length; i++) {
        const char = key.charAt(i);
        if (result.indexOf(char) == -1) result += char;
    }
    return result;
};

const extendKey = (key) => {
    let result = key;
    for (let i = 0; i < alphabet.length; i++)
        if (!result.includes(alphabet.charAt(i))) result += alphabet.charAt(i);
    return result;
};

const encrypt = (cleartext, key) => {
    const adaptedCleartext = cleartext.toUpperCase();
    let adaptedKey = key.toUpperCase();
    adaptedKey = removeKeyDoubles(adaptedKey);
    adaptedKey = extendKey(adaptedKey);
    let result = "";
    for (const char of adaptedCleartext) {
        const decimal = char.charCodeAt(0);
        if (decimal < 65 || decimal > 90) result += char;
        else result += adaptedKey.charAt(alphabet.indexOf(char));
    }
    return result;
};

const decrypt = (ciphertext, key) => {
    const adaptedCiphertext = ciphertext.toUpperCase();
    let adaptedKey = key.toUpperCase();
    adaptedKey = removeKeyDoubles(adaptedKey);
    adaptedKey = extendKey(adaptedKey);
    let result = "";
    for (const char of adaptedCiphertext) {
        const decimal = char.charCodeAt(0);
        if (decimal < 65 || decimal > 90) result += char;
        else result += alphabet.charAt(adaptedKey.indexOf(char));
    }
    return result;
};

const main = () => {
    const mode = process.argv[2];
    if (!mode || (mode != "e" && mode != "d"))
        throw new Error("Invalide mode.\ne to encrypt\nd to decrypt");
    
    const input = process.argv[3];
    if (!input) throw new Error("Invalid input");

    const key = process.argv[4];
    if (!key) throw new Error("Invalid key");

    if  (mode == "e") {
        console.log(`Cleartext:\t${input}`);
        const encrypted = encrypt(input, key);
        console.log(`Ciphertext:\t${encrypted}`);
    } else {
        console.log(`Ciphertext:\t${input}`);
        const decrypted = decrypt(input, key);
        console.log(`Cleartext:\t${decrypted}`);
    }
};

main();