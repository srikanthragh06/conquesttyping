import { FormEvent, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { signinApi } from "../../api/auth";
import { setAuthToken } from "../../utils/token";
import { useAuthStore } from "../../store/authStore";

const useSignin = () => {
    const navigate = useNavigate();
    const setUserDetails = useAuthStore((state) => state.setUserDetails);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [signinError, setSigninError] = useState<string | null>(null);
    const [signinMessage, setSigninMessage] = useState<string | null>(null);
    const [signinIsLoading, setSigninIsLoading] = useState<boolean>(false);

    const handleSignin = async (e: FormEvent) => {
        e.preventDefault();
        setSigninIsLoading(true);

        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        if (validateEmail(email)) {
            setSigninIsLoading(false);
            setSigninMessage("");
            return setSigninError(validateEmail(email));
        }
        if (validatePassword(password)) {
            setSigninIsLoading(false);
            setSigninMessage("");
            return setSigninError(validatePassword(password));
        }

        try {
            const res = await signinApi(email, password);
            if (res) {
                if (!res.data.error) {
                    setUserDetails(res.data.user);
                    setIsLoggedIn(true);
                    setAuthToken(res.data.jwtToken);

                    setSigninMessage(res?.data?.message);
                    setSigninError("");

                    navigate("/");
                } else {
                    setIsLoggedIn(false);
                    setSigninMessage("");
                    setSigninError(res?.data?.error);
                }
            } else {
                setIsLoggedIn(false);
                setSigninMessage("");
                setSigninError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setSigninMessage("");
            setSigninError("An error occurred during signin.");
            setIsLoggedIn(false);
        } finally {
            setSigninIsLoading(false);
        }
    };

    return {
        emailRef,
        passwordRef,
        signinError,
        signinMessage,
        signinIsLoading,
        handleSignin,
    };
};

export default useSignin;
