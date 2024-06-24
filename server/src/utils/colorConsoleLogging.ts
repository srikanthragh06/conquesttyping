import colors from "colors";

// Log message in red
export const consoleLogRed = (msg: string): void => {
    console.log(colors.red(msg));
};

// Log message in blue
export const consoleLogBlue = (msg: string): void => {
    console.log(colors.blue(msg));
};

// Log message in green
export const consoleLogGreen = (msg: string): void => {
    console.log(colors.green(msg));
};

// Log message in cyan
export const consoleLogCyan = (msg: string): void => {
    console.log(colors.cyan(msg));
};

// Log message in yellow
export const consoleLogYellow = (msg: string): void => {
    console.log(colors.yellow(msg));
};
