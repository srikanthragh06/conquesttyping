import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const useIsAuthPage = (authRequired: boolean, noAuthRequired: boolean) => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (authRequired) {
            if (!isLoggedIn) navigate("/auth");
        }
        if (noAuthRequired) {
            if (isLoggedIn) navigate("/");
        }
    }, [navigate, isLoggedIn]);
};

export default useIsAuthPage;
