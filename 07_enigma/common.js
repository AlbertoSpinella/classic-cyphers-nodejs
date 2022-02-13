import inquirer from "inquirer";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const validatePosition = (value) => {
    value = value.toUpperCase();
    const isValid = value != '' ? alphabet.includes(value) : false;
    return isValid || "Please enter a valid letter";
};

const validateEncryptionType = (value) => {
    const isValid = value == 1 || value == 2;
    return isValid || "Please enter a valid encryption type (1 || 2)";
};

const validateCleartext = (value) => {
    value = value.toUpperCase();
    let isValid = true;
    for (const char of value)
        if (!alphabet.includes(char)) isValid = false;
    return isValid || "Please enter a valid cleartext";
};

const questions = [
    {
        type: "input",
        name: "reflector",
        message: "What is the initial position of the reflector?",
        validate: validatePosition
    },
    {
        type: "input",
        name: "leftRotor",
        message: "What is the initial position of the left rotor?",
        validate: validatePosition
    },
    {
        type: "input",
        name: "centerRotor",
        message: "What is the initial position of center rotor?",
        validate: validatePosition
    },
    {
        type: "input",
        name: "rightRotor",
        message: "What is the initial position of the right rotor?",
        validate: validatePosition
    },
    {
        type: "input",
        name: "encryptionType",
        message: "What is the cryptation type?\n1) linear\n2) classic",
        validate: validateEncryptionType
    },
    {
        type: "input",
        name: "cleartext",
        message: "What is the message to encrypt?",
        validate: validateCleartext
    },
];

export const retrieveInput = async () => {
    const answers = await inquirer.prompt(questions);
    console.log("\nInserted Data:\n", answers);
    return await answers;
};