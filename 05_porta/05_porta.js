const encrypt = (cleartext) => {
    let adaptedCleartext = cleartext.toUpperCase();
    adaptedCleartext = adaptedCleartext.length % 2 == 0 ? adaptedCleartext : adaptedCleartext + "X";
    let result = "";
    for (let i = 0; i  < adaptedCleartext.length; i += 2) {
        const first = adaptedCleartext[i].charCodeAt(0);
        const second = adaptedCleartext[i + 1].charCodeAt(0);
        if (first < 65 || first > 90 ||
            second < 65 || second > 90) throw new Error("INVALID_INPUT_CHARS");
        else {
            const firstAbs = (first - 65)  * 26;
            const secondAbs = second - 65;
            const res =  firstAbs + secondAbs;
            result += res + " ";
        }
    }
    return result;
};

const decrypt = (ciphertext) => {
    let result = "";
    const numbers = ciphertext.split(" ");
    for (const number of numbers) {
        const second = number % 26;
        const first = (number - second) / 26;
        const firstChar = String.fromCharCode(first + 65);
        const secondChar = String.fromCharCode(second + 65);
        result += firstChar + secondChar;
    }
    return result;
};

const main = () => {
    const mode = process.argv[2];
    if (!mode || (mode != "e" && mode != "d"))
        throw new Error("Invalide mode.\ne to encrypt\nd to decrypt");
    
    const input = process.argv[3];
    if (!input) throw new Error("Invalid input");

    if  (mode == "e") {
        console.log(`Cleartext:\t${input}`);
        const encrypted = encrypt(input);
        console.log(`Ciphertext:\t${encrypted}`);
    } else {
        console.log(`Ciphertext:\t${input}`);
        const decrypted = decrypt(input);
        console.log(`Cleartext:\t${decrypted}`);
    }
};

main();