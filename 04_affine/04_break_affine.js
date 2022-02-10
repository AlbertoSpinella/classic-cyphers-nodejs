import { decrypt } from "./common.js";

const bruteforce = (ciphertext) => {
    for (let k1 = 0; k1 < 26; k1++) {
        if (k1 % 2 != 0 && k1 % 13 != 0) {
            for (let k2 = 0; k2 < 26; k2++) {
                const decrypted = decrypt(ciphertext, k1, k2);
                console.log({ k1, k2, decrypted });
            }
        }
    }
};



const main = () => {
    const input = process.argv[2];
    if (!input) throw new Error("Invalid input");

    bruteforce(input);
};

main();