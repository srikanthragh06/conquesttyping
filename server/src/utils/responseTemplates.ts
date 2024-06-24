// responseHandlers.ts

import { Request, Response } from "express";
import { logResponse } from "./logging";

export const sendClientSideError = (
    req: Request,
    res: Response,
    errMsg: string = "Invalid Request",
    statusCode: number = 400
) => {
    logResponse(req, errMsg, statusCode);
    return res.status(statusCode).json({ error: errMsg });
};

export const sendServerSideError = (
    req: Request,
    res: Response,
    err: Error,
    statusCode: number = 500
) => {
    logResponse(req, "Server Side Error", statusCode, err);
    return res.status(statusCode).json({ error: "Server Side Error" });
};

export const sendSuccessResponse = (
    req: Request,
    res: Response,
    message: string = "Request Successful",
    statusCode: number = 200,
    additionals: Record<string, any> = {}
) => {
    logResponse(req, message, statusCode);
    return res.status(statusCode).json({ message, ...additionals });
};

export const sendFileResponse = (
    req: Request,
    res: Response,
    path: string,
    statusCode: number = 200
) => {
    logResponse(req, `${path} sent successfully`, statusCode);
    return res.status(statusCode).sendFile(path);
};
