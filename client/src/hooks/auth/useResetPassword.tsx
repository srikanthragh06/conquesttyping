import { FormEvent, useRef, useState } from "react";
import { validatePassword } from "../../utils/validation";
import { resetPasswordApi } from "../../api/auth";
import { useParams } from "react-router-dom";

const useResetPassword = () => {
    const { token } = useParams();

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

    const [resetPasswordError, setResetPasswordError] = useState<string | null>(
        null
    );
    const [resetPasswordMessage, setResetPasswordMessage] = useState<
        string | null
    >(null);
    const [resetPasswordIsLoading, setResetPasswordIsLoading] =
        useState<boolean>(false);

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setResetPasswordIsLoading(true);

        const newPassword = newPasswordRef.current!.value;
        const confirmNewPassword = confirmNewPasswordRef.current?.value;

        if (validatePassword(newPassword)) {
            setResetPasswordIsLoading(false);
            setResetPasswordMessage("");
            return setResetPasswordError(validatePassword(newPassword));
        }

        if (newPassword !== confirmNewPassword) {
            setResetPasswordIsLoading(false);
            setResetPasswordMessage("");
            return setResetPasswordError(
                "Password and Confirm Password do not match"
            );
        }

        try {
            const res = await resetPasswordApi(newPassword, token as string);
            if (res) {
                if (!res.data.error) {
                    setResetPasswordMessage(res?.data?.message);
                    setResetPasswordError("");
                } else {
                    setResetPasswordMessage("");
                    setResetPasswordError(res?.data?.error);
                }
            } else {
                setResetPasswordMessage("");
                setResetPasswordError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setResetPasswordMessage("");
            setResetPasswordError("An error occurred during password reset.");
        } finally {
            setResetPasswordIsLoading(false);
        }
    };

    return {
        newPasswordRef,
        confirmNewPasswordRef,
        resetPasswordError,
        resetPasswordMessage,
        resetPasswordIsLoading,
        handleResetPassword,
    };
};

export default useResetPassword;
