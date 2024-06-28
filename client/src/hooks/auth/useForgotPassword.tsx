import { FormEvent, useRef, useState } from "react";
import { forgotPasswordApi } from "../../api/auth";
import { validateEmail } from "../../utils/validation";

const useForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const [forgotPasswordError, setForgotPasswordError] = useState<
        string | null
    >(null);
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState<
        string | null
    >(null);
    const [forgotPasswordIsLoading, setForgotPasswordIsLoading] =
        useState<boolean>(false);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        setForgotPasswordIsLoading(true);

        const email = emailRef.current!.value;

        if (validateEmail(email)) {
            setForgotPasswordIsLoading(false);
            setForgotPasswordMessage("");
            return setForgotPasswordError(validateEmail(email));
        }

        try {
            const res = await forgotPasswordApi(email);
            if (res) {
                if (!res.data.error) {
                    setForgotPasswordMessage(res.data.message);
                    setForgotPasswordError("");
                } else {
                    setForgotPasswordMessage("");
                    setForgotPasswordError(res.data.error);
                }
            } else {
                setForgotPasswordMessage("");
                setForgotPasswordError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setForgotPasswordMessage("");
            setForgotPasswordError("An error occurred.");
        } finally {
            setForgotPasswordIsLoading(false);
        }
    };

    return {
        emailRef,
        forgotPasswordError,
        forgotPasswordMessage,
        forgotPasswordIsLoading,
        handleForgotPassword,
    };
};

export default useForgotPassword;
