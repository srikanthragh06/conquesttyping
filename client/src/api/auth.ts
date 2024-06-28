import { CodeResponse } from "@react-oauth/google";
import client from "./client";
import { AxiosResponse, AxiosError } from "axios";

export const signupApi = async (email: string, password: string) => {
    try {
        const res: AxiosResponse = await client.post("/auth/signup", {
            email,
            password,
        });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const verifyEmailApi = async (token: string) => {
    try {
        const res = await client.post("/auth/verify-email", { token });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const signinApi = async (email: string, password: string) => {
    try {
        const res: AxiosResponse = await client.post("/auth/signin", {
            email,
            password,
        });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const googleAuthApi = async (
    tokenRes: Omit<CodeResponse, "error" | "error_description" | "error_uri">
) => {
    try {
        const res = await client.post("/auth/google-auth", tokenRes);
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const isAuthApi = async (token: string) => {
    try {
        const res = await client.get("/auth/is-auth", {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const forgotPasswordApi = async (email: string) => {
    try {
        const res = await client.post("/auth/forgot-password", { email });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const resetPasswordApi = async (password: string, token: string) => {
    try {
        const res = await client.post("/auth/reset-password", {
            password,
            token,
        });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const updatePasswordApi = async (
    token: string,
    oldPassword: string,
    newPassword: string
) => {
    try {
        const res = await client.patch(
            "/auth/update-password",
            {
                token,
                oldPassword,
                newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "application/json",
                },
            }
        );
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};
