import nodemailer, { Transporter } from "nodemailer";
import { logSendEmails } from "./logging";
import dotenv from "dotenv";

dotenv.config();

interface MailCallback {
    (error: Error | null, info: any): void;
}

export const generateMailTransporter = (): Transporter | null => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_TRANSPORTER_HOST,
            port: parseInt(process.env.MAIL_TRANSPORTER_PORT || "0", 10),
            auth: {
                user: process.env.MAIL_TRANSPORTER_USER,
                pass: process.env.MAIL_TRANSPORTER_PASS,
            },
        });
        return transporter;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const sendMailWithTransporter = async (
    transporter: Transporter,
    from: string,
    to: string,
    subject: string,
    html: string
): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });
        logSendEmails(from, to, subject, html, null);
    } catch (err) {
        console.error(err);
        logSendEmails(from, to, subject, html, err);
        throw err;
    }
};

export const sendVerificationMail = async (
    token: string,
    email: string
): Promise<void> => {
    try {
        const url = `${process.env.BASE_URL}/verify/${token}`;
        const transporter = generateMailTransporter();
        if (transporter) {
            await sendMailWithTransporter(
                transporter,
                "verification@conquesttyping.xyz",
                email,
                "Please verify your email address",
                `<a href="${url}">${url}</a>`
            );
        } else {
            throw new Error("Mail transporter is not available.");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const sendResetPasswordMail = async (
    token: string,
    email: string
): Promise<void> => {
    try {
        const url = `${process.env.BASE_URL}/reset-password/${token}`;
        const transporter = generateMailTransporter();
        if (transporter) {
            await sendMailWithTransporter(
                transporter,
                "verification@conquesttyping.xyz",
                email,
                "Reset your password here!",
                `<a href="${url}">${url}</a>`
            );
        } else {
            throw new Error("Mail transporter is not available.");
        }
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

export const sendPasswordResetConfirmationMail = async (
    email: string
): Promise<void> => {
    try {
        const transporter = generateMailTransporter();
        if (transporter) {
            await sendMailWithTransporter(
                transporter,
                "verification@conquesttyping.xyz",
                email,
                "Password reset confirmation",
                `<p>This email is sent to notify to you that your password has been reset successfully</p>`
            );
        } else {
            throw new Error("Mail transporter is not available.");
        }
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};
