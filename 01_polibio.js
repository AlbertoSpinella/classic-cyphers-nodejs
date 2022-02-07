const polibiusChessboard = [
    [ "A", "B", "C", "D", "E" ],
    [ "F", "G", "H", "I", "K" ],
    [ "L", "M", "N", "O", "P" ],
    [ "Q", "R", "S", "T", "U" ],
    [ "V", "W", "X", "Y", "Z" ]
];

const encrypt = (cleartext) => {
    let result = "";
    const adapted = cleartext.toUpperCase().replace("J", "I");
    for (let i = 0; i < adapted.length; i++) {
        for (let j = 0; j < polibiusChessboard.length; j++) {
            const indexOf = polibiusChessboard[j].indexOf(adapted[i]);
            if (indexOf != -1) {
                result += ((j + 1).toString() + (indexOf + 1).toString())
                j = polibiusChessboard.length;
            }                
        }
    }
    return result;
};

const decrypt = (ciphertext) => {
    if (ciphertext.length % 2 == 1)
        throw new Error("Invalid ciphertext. Length not even");
    let result = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
        const raw = parseInt(ciphertext.charAt(i));
        const col = parseInt(ciphertext.charAt(i + 1));
        result += polibiusChessboard[raw - 1][col - 1];
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