import { Request, Response, NextFunction } from "express";
import {
    sendClientSideError,
    sendServerSideError,
} from "../utils/responseTemplates";

export const urlNotFoundHandler = (req: Request, res: Response) => {
    return sendClientSideError(req, res, "404 Not Found", 404);
};

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    return sendServerSideError(req, res, err);
};

export const incorrectJSONFormatHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof SyntaxError) {
        return sendClientSideError(req, res, "Invalid JSON Format");
    } else {
        next();
    }
};
