import { generate } from "random-words";

const generateProb = (prob: number) => {
    return Math.random() < prob;
};

function getRandomElement(array: Array<string>) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateNumber() {
    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let number = "";

    number += getRandomElement(digits);

    while (true) {
        if (generateProb(0.75)) number += getRandomElement(digits);
        else break;
    }
    return number;
}

function encircleWord(word: string) {
    const characters = [`(`, `'`, `"`, `[`, `{`];

    const char = getRandomElement(characters);

    if (char === "(") {
        return `(${word})`;
    } else if (char === "'" || char === '"') {
        return `${char}${word}${char}`;
    } else {
        return `${char}${word}${
            char === "[" ? "]" : char === "{" ? "}" : char
        }`;
    }
}

function addBreakWord(word: string) {
    const characters = [`,`, `;`, `:`];
    const char = getRandomElement(characters);
    return word + char;
}

function capitalizeFirstLetter(word: string) {
    return word[0].toUpperCase() + word.slice(1);
}

export const generateRandomParagraph = (length: number) => {
    let para = "";
    let capitalize = true;

    for (let i = 0; i < length; i++) {
        if (!capitalize && generateProb(1 / 12)) {
            para += generate() + getRandomElement([".", "?", "!"]);
            capitalize = true;
        } else {
            if (generateProb(1 / 12)) para += generateNumber();
            else if (!capitalize && generateProb(1 / 20))
                para += getRandomElement(["-", "+", "=", "&"]);
            else {
                let word = generate();
                if (!capitalize && generateProb(1 / 25))
                    word = encircleWord(word as string);
                else if (generateProb(1 / 15))
                    word = addBreakWord(word as string);

                if (capitalize) {
                    word = capitalizeFirstLetter(word as string);
                    capitalize = false;
                }
                para += word;
            }
        }
        if (i < length - 1) para += " ";
    }
    para += ".";
    return para;
};
