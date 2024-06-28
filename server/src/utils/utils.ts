import bcrypt from "bcrypt";
import crypto from "crypto";

export const generateRandomDigits = (length: number): string => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10).toString();
    }
    return result;
};

export const generateInitialUsername = (email: string): string => {
    const usernamePrefix =
        email.split("@")[0].length <= 22
            ? email.split("@")[0]
            : email.split("@")[0].slice(0, 22);
    const usernameSuffix = generateRandomDigits(10);
    return usernamePrefix + usernameSuffix;
};

export const generateSaltAndHashedPassword = async (
    password: string
): Promise<{ salt: string; hashedPassword: string }> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
};

export const checkPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export const generateUpdatePasswordToken = (): string => {
    return crypto.randomBytes(32).toString("hex");
};
