import express from "express";
import { Request, Response } from "express";
import {
    googleAuthHandler,
    signinHandler,
    signupHandler,
    verifyEmailHandler,
} from "../controllers/auth";
import {
    googleAuthValidation,
    isAuth,
    signinValidation,
    signupValidation,
    verifyEmailValidation,
} from "../middlewares/auth";
import { sendSuccessResponse } from "../utils/responseTemplates";

const router = express.Router();

router.route("/signup").post(signupValidation, signupHandler);

router.route("/signin").post(signinValidation, signinHandler);

router.route("/verify-email").post(verifyEmailValidation, verifyEmailHandler);

router.route("/google-auth").post(googleAuthValidation, googleAuthHandler);

router.route("/is-auth").get(isAuth, (req: Request, res: Response) => {
    const user = (req as any).user;
    return sendSuccessResponse(req, res, `User authorized successfully`, 200, {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            isGoogleAuth: user.isGoogleAuth,
            createdAt: user.createdAt,
            lastActive: user.lastActive,
        },
    });
});

export default router;
