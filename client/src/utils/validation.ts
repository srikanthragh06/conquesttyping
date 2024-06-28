export const validateEmail = (
    email: string,
    optional: boolean = false
): string | null => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!optional && !email) return "Missing Email Address";

    if (!pattern.test(email)) {
        return "Invalid email format. Please enter a valid email address.";
    } else {
        return null;
    }
};

export const validatePassword = (
    password: string,
    minLength: number = 8,
    maxLength: number = 32,
    optional: boolean = false,
    name: string = "Password"
): string | null => {
    if (!optional && !password) return `Missing ${name}`;

    if (!(password.length >= minLength && password.length <= maxLength)) {
        return `${name} must be between ${minLength} and ${maxLength} characters long.`;
    } else {
        return null;
    }
};
