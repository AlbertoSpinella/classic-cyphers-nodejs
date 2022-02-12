const expandKey = (key, len) => {
    let res = "";
    for (let i = 0; i < len; i++)
        res += key.charAt(i % key.length);
    return res;
};

const encrypt = (cleartext, key) => {
    let adaptedCleartext = cleartext.toUpperCase().replace(" ", "");
    let adaptedKey = key.toUpperCase();
    adaptedKey = expandKey(adaptedKey, adaptedCleartext.length);
    let result = "";
    for (let i = 0; i  < adaptedCleartext.length; i++) {
        const charClartext = adaptedCleartext[i].charCodeAt(0) - 65;
        const charKey = adaptedKey[i].charCodeAt(0) - 65;
        const sum = (charClartext + charKey) % 26;
        result += String.fromCharCode(sum + 65);
    }
    return result;
};

const decrypt = (ciphertext, key) => {
    let adaptedCiphertext = ciphertext.toUpperCase().replace(" ", "");
    let adaptedKey = key.toUpperCase();
    adaptedKey = expandKey(adaptedKey, adaptedCiphertext.length);
    let result = "";
    for (let i = 0; i  < adaptedCiphertext.length; i++) {
        const charClartext = adaptedCiphertext[i].charCodeAt(0) - 65;
        const charKey = adaptedKey[i].charCodeAt(0) - 65;
        let sub = (charClartext - charKey) % 26;
        sub = sub > 0 ? sub : sub + 26;
        result += String.fromCharCode(sub + 65);
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