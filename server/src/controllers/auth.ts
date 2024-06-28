import { Request, Response, NextFunction } from "express";
import { transaction } from "../db/db";
import {
    deleteRecords,
    findOneWithCondition,
    insertRecord,
    updateRecords,
} from "../db/queries";
import {
    sendClientSideError,
    sendSuccessResponse,
} from "../utils/responseTemplates";
import {
    checkPassword,
    generateInitialUsername,
    generateSaltAndHashedPassword,
    generateUpdatePasswordToken,
} from "../utils/utils";
import crypto from "crypto";
import {
    sendPasswordResetConfirmationMail,
    sendResetPasswordMail,
    sendVerificationMail,
} from "../utils/mail";

import jwt from "jsonwebtoken";
import { sendOutgoingRequest } from "../utils/requestTemplates";

export const signupHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        await transaction(async (client) => {
            const oldUser = await findOneWithCondition(
                client,
                "Users",
                ["id"],
                { email }
            );
            if (oldUser)
                return sendClientSideError(
                    req,
                    res,
                    "User with this email address already exists"
                );

            const username = generateInitialUsername(email);
            const { salt, hashedPassword } =
                await generateSaltAndHashedPassword(password);

            const updatePasswordToken = generateUpdatePasswordToken();

            const newUser = await insertRecord(client, "Users", {
                username,
                email,
                password: hashedPassword,
                salt,
                updatePasswordToken,
            });
            const token = crypto.randomBytes(32).toString("hex");
            await insertRecord(client, "EmailVerifications", {
                userId: newUser.id,
                token,
            });

            await sendVerificationMail(token, email);

            return sendSuccessResponse(
                req,
                res,
                `Email verification sent to ${email} successfully`,
                201
            );
        });
    } catch (err) {
        next(err);
    }
};

export const verifyEmailHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.body;

        await transaction(async (client) => {
            const emailVerification = await findOneWithCondition(
                client,
                "EmailVerifications",
                ["id", "userId", "expiresAt"],
                { token }
            );
            if (!emailVerification)
                return sendClientSideError(
                    req,
                    res,
                    `Invalid email verification token ${token}`
                );

            if (emailVerification.expiresAt < new Date())
                return sendClientSideError(
                    req,
                    res,
                    `Verification Token ${token} has expired`
                );

            await updateRecords(
                client,
                "Users",
                { isVerified: true },
                { id: emailVerification?.userId }
            );

            await deleteRecords(client, "EmailVerifications", { token });

            return sendSuccessResponse(
                req,
                res,
                `User has been successfully verified`
            );
        });
    } catch (err) {
        next(err);
    }
};

export const signinHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        await transaction(async (client) => {
            const user = await findOneWithCondition(client, "Users", null, {
                email,
            });
            if (!user)
                return sendClientSideError(
                    req,
                    res,
                    `User with email address ${email} does not exist`
                );

            const isMatch = await checkPassword(password, user.password);
            if (!isMatch)
                return sendClientSideError(req, res, `Incorrect credentials`);

            if (!user.isVerified) {
                await deleteRecords(client, "EmailVerifications", {
                    userId: user.id,
                });

                const token = crypto.randomBytes(32).toString("hex");

                await insertRecord(client, "EmailVerifications", {
                    userId: user?.id,
                    token,
                });

                await sendVerificationMail(token, email);

                return sendClientSideError(
                    req,
                    res,
                    `Please verify your email address. We've just sent a new verification email to ${email}`
                );
            } else {
                const jwtToken = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        updatePasswordToken: user.updatePasswordToken,
                    },
                    process.env.JWT_SECRET_KEY as string,
                    { expiresIn: "24h" }
                );

                return sendSuccessResponse(
                    req,
                    res,
                    `${email} signed in successfully`,
                    200,
                    {
                        jwtToken,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            isVerified: user.isVerified,
                            isGoogleAuth: user.isGoogleAuth,
                            createdAt: user.createdAt,
                            lastActive: user.lastActive,
                        },
                    }
                );
            }
        });
    } catch (err) {
        next(err);
    }
};

export const googleAuthHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { code } = req.body;

        const { data: tokenResponse } = await sendOutgoingRequest(
            "https://oauth2.googleapis.com/token",
            "POST",
            {},
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: "http://localhost:5173",
                grant_type: "authorization_code",
            }
        );
        const accessToken = tokenResponse?.access_token;

        const { data: userInfo } = await sendOutgoingRequest(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            "GET",
            {
                Authorization: `Bearer ${accessToken}`,
            }
        );
        const { email } = userInfo;
        if (!email)
            sendClientSideError(
                req,
                res,
                "Google Authentication did not provide user email"
            );

        await transaction(async (client) => {
            const alreadyUser = await findOneWithCondition(
                client,
                "Users",
                null,
                { email }
            );

            if (alreadyUser) {
                if (!alreadyUser.isGoogleAuth) {
                    await updateRecords(
                        client,
                        "Users",
                        { isVerified: true, isGoogleAuth: true },
                        { id: alreadyUser.id }
                    );
                }

                const jwtToken = jwt.sign(
                    {
                        id: alreadyUser.id,
                        email: alreadyUser.email,
                        updatePasswordToken: alreadyUser.updatePasswordToken,
                    },
                    process.env.JWT_SECRET_KEY as string,
                    { expiresIn: "24h" }
                );

                return sendSuccessResponse(
                    req,
                    res,
                    `${email} signed in successfully`,
                    200,
                    {
                        jwtToken,
                        user: {
                            id: alreadyUser.id,
                            username: alreadyUser.username,
                            email: alreadyUser.email,
                            isVerified: alreadyUser.isVerified,
                            isGoogleAuth: alreadyUser.isGoogleAuth,
                            createdAt: alreadyUser.createdAt,
                            lastActive: alreadyUser.lastActive,
                        },
                    }
                );
            } else {
                const username = generateInitialUsername(email);

                const newUser = await insertRecord(client, "Users", {
                    username,
                    email,
                    isVerified: true,
                    isGoogleAuth: true,
                });

                const jwtToken = jwt.sign(
                    { id: newUser.id, email: newUser.email },
                    process.env.JWT_SECRET_KEY as string,
                    { expiresIn: "24h" }
                );

                return sendSuccessResponse(
                    req,
                    res,
                    `${email} signed up successfully`,
                    201,
                    {
                        jwtToken,
                        user: {
                            id: newUser.id,
                            username: newUser.username,
                            email: newUser.email,
                            isVerified: newUser.isVerified,
                            isGoogleAuth: newUser.isGoogleAuth,
                            createdAt: newUser.createdAt,
                            lastActive: newUser.lastActive,
                        },
                    }
                );
            }
        });
    } catch (err) {
        next(err);
    }
};

export const forgotPasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;

        await transaction(async (client) => {
            const user = await findOneWithCondition(client, "Users", ["id"], {
                email,
            });
            if (!user)
                return sendClientSideError(
                    req,
                    res,
                    `User with email ${email} doesn't exist`
                );

            const oldPasswordResetToken = await findOneWithCondition(
                client,
                "PasswordResetTokens",
                ["id"],
                { userId: user.id }
            );
            if (oldPasswordResetToken) {
                await deleteRecords(client, "PasswordResetTokens", {
                    id: oldPasswordResetToken.id,
                });
            }

            const token = crypto.randomBytes(32).toString("hex");
            await insertRecord(client, "PasswordResetTokens", {
                userId: user?.id,
                token,
            });

            await sendResetPasswordMail(token, email);

            return sendSuccessResponse(
                req,
                res,
                `Password reset link has been sent to ${email}`
            );
        });
    } catch (err) {
        next(err);
    }
};

export const resetPasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { password, token } = req.body;

        await transaction(async (client) => {
            const passwordResetToken = await findOneWithCondition(
                client,
                "PasswordResetTokens",
                ["id", "userId", "expiresAt"],
                { token }
            );
            if (!passwordResetToken)
                return sendClientSideError(
                    req,
                    res,
                    `Invalid password reset token ${token}`
                );

            if (passwordResetToken.expiresAt < new Date())
                return sendClientSideError(
                    req,
                    res,
                    `Password Reset Token ${token} has expired`
                );

            const { salt, hashedPassword } =
                await generateSaltAndHashedPassword(password);
            await updateRecords(
                client,
                "Users",
                { salt, password: hashedPassword },
                { id: passwordResetToken?.userId }
            );

            await deleteRecords(client, "PasswordResetTokens", {
                id: passwordResetToken.id,
            });

            const { email } = await findOneWithCondition(
                client,
                "Users",
                ["email"],
                { id: passwordResetToken.userId }
            );

            try {
                await sendPasswordResetConfirmationMail(email);
            } catch (err) {
                console.error(err);
            }

            return sendSuccessResponse(
                req,
                res,
                `User password has been reset successfully`
            );
        });
    } catch (err) {
        next(err);
    }
};

export const updatePasswordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { user } = req as any;

        if (!user.password)
            return sendClientSideError(req, res, "User does not have password");

        const isMatch = await checkPassword(oldPassword, user.password);
        if (!isMatch)
            return sendClientSideError(req, res, "Incorrect old password");

        await transaction(async (client) => {
            const { salt, hashedPassword } =
                await generateSaltAndHashedPassword(newPassword);

            const updatePasswordToken = generateUpdatePasswordToken();

            await updateRecords(
                client,
                "Users",
                {
                    salt,
                    password: hashedPassword,
                    updatePasswordToken,
                },
                { id: user.id }
            );

            const jwtToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    updatePasswordToken,
                },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "24h" }
            );

            return sendSuccessResponse(
                req,
                res,
                "Password updated successfully",
                200,
                { jwtToken }
            );
        });
    } catch (err) {
        next(err);
    }
};
