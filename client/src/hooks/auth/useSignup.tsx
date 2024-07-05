import { FormEvent, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { signupApi } from "../../api/auth";
import { setAuthToken } from "../../utils/token";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const navigate = useNavigate();

    const setUserDetails = useAuthStore((state) => state.setUserDetails);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [signupError, setSignupError] = useState<string | null>(null);
    const [signupMessage, setSignupMessage] = useState<string | null>(null);
    const [signupIsLoading, setSignupIsLoading] = useState<boolean>(false);

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setSignupIsLoading(true);

        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;
        const confirmPassword = confirmPasswordRef.current!.value;

        if (validateEmail(email)) {
            setSignupIsLoading(false);
            setSignupMessage("");
            return setSignupError(validateEmail(email));
        }
        if (validatePassword(password)) {
            setSignupIsLoading(false);
            setSignupMessage("");
            return setSignupError(validatePassword(password));
        }
        if (password !== confirmPassword) {
            setSignupIsLoading(false);
            setSignupMessage("");
            return setSignupError("Password and Confirm Password do not match");
        }

        try {
            const res = await signupApi(email, password);
            if (res) {
                if (!res.data.error) {
                    setUserDetails(res.data.user);
                    setAuthToken(res.data.jwtToken);

                    setSignupMessage(res?.data?.message);
                    setSignupError("");
                    navigate("/");
                } else {
                    setSignupMessage("");
                    setSignupError(res?.data?.error);
                }
            } else {
                setSignupMessage("");
                setSignupError("No response from server");
            }
        } catch (error) {
            console.error(error);
            setSignupMessage("");
            setSignupError("An error occurred during signup.");
        } finally {
            setSignupIsLoading(false);
        }
    };

    return {
        emailRef,
        passwordRef,
        confirmPasswordRef,
        signupError,
        signupMessage,
        signupIsLoading,
        handleSignup,
    };
};

export default useSignup;
