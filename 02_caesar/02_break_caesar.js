import { decrypt } from "./common.js";

const bruteforce = (ciphertext) => {
    for (let i = 1; i <= 26; i++) {
        console.log(`${i}:\t${decrypt(ciphertext, i)}`);
    }
};

const main = () => {
    const input = process.argv[2];
    if (!input) throw new Error("Invalid input");

    console.log(`Input:\t${input}`);
    bruteforce(input);
};

main();