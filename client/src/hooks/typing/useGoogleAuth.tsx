import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { googleAuthApi } from "../../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/token";
import { useAuthStore } from "../../store/authStore";

const useGoogleAuth = () => {
    const navigate = useNavigate();

    const setUserDetails = useAuthStore((state) => state.setUserDetails);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

    const [googleAuthIsLoading, setGoogleAuthIsLoading] = useState(false);
    const [googleAuthError, setGoogleAuthError] = useState("");

    const handleOnSuccess = async (
        tokenRes: Omit<
            CodeResponse,
            "error" | "error_description" | "error_uri"
        >
    ) => {
        setGoogleAuthIsLoading(true);
        try {
            const res = await googleAuthApi(tokenRes);
            if (res) {
                if (!res.data.error) {
                    setUserDetails(res.data.user);
                    setIsLoggedIn(true);
                    setAuthToken(res.data.jwtToken);

                    setGoogleAuthError("");

                    navigate("/");
                } else {
                    setGoogleAuthError(res?.data?.error);
                    setIsLoggedIn(false);
                }
            } else {
                setGoogleAuthError("No response from server");
                setIsLoggedIn(false);
            }
        } catch (error) {
            setGoogleAuthError(
                "An error occurred during Google authentication."
            );
            setIsLoggedIn(false);
            console.error(error);
        } finally {
            setGoogleAuthIsLoading(false);
        }
    };

    const handleOnError = (
        error: Pick<CodeResponse, "error" | "error_description" | "error_uri">
    ) => {
        setGoogleAuthError("An error occurred during Google authentication.");
        console.error("Google authentication error:", error);
        setGoogleAuthIsLoading(false);
    };

    const handleGoogleSignin = useGoogleLogin({
        onSuccess: (tokenRes) => handleOnSuccess(tokenRes),
        onError: (error) => handleOnError(error),
        flow: "auth-code",
    });

    return {
        handleGoogleSignin,
        googleAuthIsLoading,
        googleAuthError,
    };
};

export default useGoogleAuth;
