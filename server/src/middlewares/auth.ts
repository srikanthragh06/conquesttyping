import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { sendClientSideError } from "../utils/responseTemplates";
import jwt from "jsonwebtoken";
import { transaction } from "../db/db";
import { findOneWithCondition, updateRecords } from "../db/queries";

export const signupValidation = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Incorrect email format"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("Password must be 8-32 characters in length"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const verifyEmailValidation = [
    body("token")
        .exists()
        .withMessage("Token is missing")
        .isString()
        .withMessage("Token must be a string"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const signinValidation = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Incorrect email format"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("Password must be 8-32 characters in length"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const googleAuthValidation = [
    body("code").exists().withMessage("Google Auth Code required!"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const isAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers?.authorization;
        if (!token) return sendClientSideError(req, res, "Auth-token missing");

        if (token.split("Bearer").length !== 2)
            return sendClientSideError(
                req,
                res,
                "Invalid Authentication Token"
            );

        const jwtToken = token.split("Bearer ")[1];
        if (!jwtToken)
            return sendClientSideError(req, res, "Auth-token missing");

        type decodedTokenType = {
            id: number;
            email: string;
            updatePasswordToken: string;
        };
        let decodedToken: decodedTokenType;
        try {
            decodedToken = jwt.verify(
                jwtToken,
                process.env.JWT_SECRET_KEY as string
            ) as decodedTokenType;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return sendClientSideError(
                    req,
                    res,
                    "token expired, please login again"
                );
            } else if (error instanceof jwt.JsonWebTokenError) {
                return sendClientSideError(
                    req,
                    res,
                    "Invalid Authentication Token"
                );
            } else {
                throw error;
            }
        }

        const { id, email, updatePasswordToken } = decodedToken;
        if (!id)
            return sendClientSideError(
                req,
                res,
                "Invalid auth-token, user not found"
            );

        await transaction(async (client) => {
            const user = await findOneWithCondition(client, "Users", null, {
                id,
                email,
            });
            if (!user)
                return sendClientSideError(
                    req,
                    res,
                    "Invalid auth-token, user not found"
                );

            if (!user.isVerified)
                return sendClientSideError(req, res, "User is not verified");

            if (
                updatePasswordToken &&
                updatePasswordToken !== user.updatePasswordToken
            )
                return sendClientSideError(
                    req,
                    res,
                    "Please sign in with your new password"
                );
            else if (!updatePasswordToken && !user.isGoogleAuth)
                return sendClientSideError(
                    req,
                    res,
                    "Invalid auth-token, user not found"
                );

            await updateRecords(
                client,
                "Users",
                { lastActive: new Date() },
                { id }
            );

            (req as any).user = user;
        });
        return next();
    } catch (err) {
        next(err);
    }
};

export const forgotPasswordValidation = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Incorrect email format"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const resetPasswordValidation = [
    body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("Password must be 8-32 characters in length"),
    body("token").exists().withMessage("Token is missing"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];

export const updatePasswordValidation = [
    body("oldPassword")
        .exists()
        .withMessage("oldPassword is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("oldPassword must be 8-32 characters in length"),
    body("newPassword")
        .exists()
        .withMessage("newPassword is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("newPassword must be 8-32 characters in length"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];
