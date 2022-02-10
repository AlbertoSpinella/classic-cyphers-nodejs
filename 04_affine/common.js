

const calculateOpposite = (k1) => {
    for (let i = 0; i < 26; i++)  {
        const opposite = ((k1 * i) % 26);
        if (opposite == 1) return i;
    }
};

export const decrypt = (ciphertext, k1, k2) => {
    if (k1 % 13 == 0 || k1 % 2 == 0)
        throw new Error("k1 cannot be divisor of 26");
    const adaptedCiphertext = ciphertext.toUpperCase();
    let result = "";
    for (const char of adaptedCiphertext) {
        const decimal = char.charCodeAt(0);
        if (decimal < 65 || decimal > 90) result += char;
        else {
            const product = calculateOpposite(k1) * (parseInt(decimal) - parseInt(k2) - 65);
            const modulus = product % 26 >= 0 ? product % 26 : product % 26 + 26;
            const rotated = (modulus) + 65;
            result += String.fromCharCode(rotated);
        }
    }
    return result;
};