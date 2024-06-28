import express from "express";
import { Request, Response } from "express";
import {
    forgotPasswordHandler,
    googleAuthHandler,
    resetPasswordHandler,
    signinHandler,
    signupHandler,
    updatePasswordHandler,
    verifyEmailHandler,
} from "../controllers/auth";
import {
    forgotPasswordValidation,
    googleAuthValidation,
    isAuth,
    resetPasswordValidation,
    signinValidation,
    signupValidation,
    updatePasswordValidation,
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

router
    .route("/forgot-password")
    .post(forgotPasswordValidation, forgotPasswordHandler);

router
    .route("/reset-password")
    .post(resetPasswordValidation, resetPasswordHandler);

router
    .route("/update-password")
    .patch(isAuth, updatePasswordValidation, updatePasswordHandler);

export default router;
