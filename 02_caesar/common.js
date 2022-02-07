export const decrypt = (ciphertext, rot) => {
    const adapted = ciphertext.toUpperCase();
    let result = "";
    for (const char of adapted) {
        const decimal = char.charCodeAt(0);
        if (decimal == 32) result += " ";
        else {
            const finalNumber = decimal - rot;
            const rotated = finalNumber >= 65 ? finalNumber : finalNumber + 26;
            result += String.fromCharCode(rotated);
        }
    }
    return result;
};