import path from "path";
import fs from "fs";
import {
    consoleLogGreen,
    consoleLogRed,
    consoleLogBlue,
} from "./colorConsoleLogging";
import { Request, Response, NextFunction } from "express";

import { IncomingHttpHeaders } from "http";
import { AxiosResponse, AxiosError } from "axios";

// Utility function to create directory if it doesn't exist
const ensureDirectoryExists = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const getClientIP = (
    headers: IncomingHttpHeaders,
    socketAddress: string | undefined
): string => {
    const xForwardedFor = headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string") {
        return xForwardedFor.split(",")[0].trim(); // Take the first IP if there are multiple
    } else if (Array.isArray(xForwardedFor)) {
        return xForwardedFor[0].trim(); // Take the first IP from the array
    } else {
        return socketAddress || "Unknown IP"; // Fall back to socket address if x-forwarded-for is not present
    }
};

// Log request
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const clientIP = getClientIP(req.headers, req.socket.remoteAddress);
    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(__dirname, "..", "logs", "requests", fileName);

    ensureDirectoryExists(path.join(__dirname, "..", "logs", "requests"));

    const logMsg = `REQUEST | ${clientIP} | ${timestamp} | ${req.method} | ${req.originalUrl}`;
    consoleLogBlue(logMsg);

    fs.appendFile(filePath, logMsg + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });

    next();
};

// Log response
export const logResponse = (
    req: Request,
    resMessage: string,
    statusCode: number = 200,
    serverSideError: Error | null = null
) => {
    const clientIP = getClientIP(req.headers, req.socket.remoteAddress);
    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(__dirname, "..", "logs", "responses", fileName);

    ensureDirectoryExists(path.join(__dirname, "..", "logs", "responses"));

    const logMsg = `RESPONSE | ${clientIP} | ${statusCode} | ${timestamp} | ${req.method} | ${req.originalUrl} | ${resMessage}`;
    if (Math.floor(statusCode / 100) === 2) {
        consoleLogGreen(logMsg);
    } else {
        consoleLogRed(logMsg);
    }

    const logDetails = serverSideError
        ? `${logMsg}\n${serverSideError.stack || serverSideError}\n`
        : `${logMsg}\n`;

    fs.appendFile(filePath, logDetails, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Log socket messages
export const logSocket = (msg: string) => {
    const logsSocketsPath = path.join(__dirname, "..", "logs", "sockets");
    ensureDirectoryExists(logsSocketsPath);

    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(logsSocketsPath, fileName);

    const logMsg = `${timestamp} | ${msg}`;

    fs.appendFile(filePath, logMsg + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Log sent emails
export const logSendEmails = (
    from: string,
    to: string,
    subject: string,
    html: string,
    error: unknown
) => {
    const logsMailPath = path.join(__dirname, "..", "logs", "mail");
    ensureDirectoryExists(logsMailPath);

    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(logsMailPath, fileName);

    const logMsg = `
Logging sent email...
From: ${from}
To: ${to}
Subject: ${subject}
HTML: ${html}
${error ? "Error: " + error : ""}
    `;

    if (error) {
        consoleLogRed(logMsg);
    } else {
        consoleLogGreen(logMsg);
    }

    fs.appendFile(filePath, logMsg + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Log outgoing requests
export const logOutgoingRequest = (url: string, method: string): void => {
    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(
        __dirname,
        "..",
        "logs",
        "outgoingRequests",
        fileName
    );

    const logMsg = `OUTGOING REQUEST | ${timestamp} | ${method} | ${url}`;
    consoleLogBlue(logMsg);

    ensureDirectoryExists(
        path.join(__dirname, "..", "logs", "outgoingRequests")
    );

    fs.appendFile(filePath, logMsg + "\n", (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Log incoming responses
export const logIncomingResponse = (res: AxiosResponse<any> | undefined) => {
    const timestamp = new Date().toLocaleString();
    const fileName = `${timestamp.split(",")[0].replaceAll("/", "-")}.log`;
    const filePath = path.join(
        __dirname,
        "..",
        "logs",
        "incomingResponses",
        fileName
    );

    ensureDirectoryExists(path.dirname(filePath));

    if (!res) {
        const logMsg = `INCOMING RESPONSE | ${timestamp} | Response is undefined`;
        fs.appendFile(filePath, logMsg + "\n", (err) => {
            if (err) {
                console.error("Error writing log file:", err);
            }
        });
    } else {
        const url = res.config.url || "Unknown URL";
        const method = res.config.method
            ? res.config.method.toUpperCase()
            : "Unknown Method";
        const statusCode = res.status || 500;

        const logMsg = `INCOMING RESPONSE | ${timestamp} | ${method} | ${url} | ${statusCode}`;
        const logColor = Math.floor(statusCode / 100) === 2 ? "green" : "red";

        const logDetails =
            logColor === "red"
                ? `${logMsg}\n${JSON.stringify(res.data)}\n`
                : `${logMsg}\n`;

        fs.appendFile(filePath, logDetails, (err) => {
            if (err) {
                console.error("Error writing log file:", err);
            }
        });
    }
};
