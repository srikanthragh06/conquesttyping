import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmailApi } from "../../api/auth";

const useVerification = () => {
    const { token } = useParams();

    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleUserVerification = async () => {
            try {
                setIsLoading(true);

                const res = await verifyEmailApi(token as string);
                if (res) {
                    if (!res.data.error) {
                        setIsVerified(true);
                        setMessage(
                            "Your account is now verified. You can now sign in to your account"
                        );
                    } else {
                        setIsVerified(false);
                        setMessage(res?.data?.error);
                    }
                } else {
                    setIsVerified(false);
                    setMessage("No response from server.");
                }
            } catch (err) {
                setIsVerified(false);
                setMessage("An error occurred during verification");
            } finally {
                setIsLoading(false);
            }
        };
        handleUserVerification();
    }, [token]);

    return { isVerified, isLoading, message };
};

export default useVerification;
