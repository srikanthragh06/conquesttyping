import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

const useIsAuth = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        isAuth();
    }, [isLoggedIn]);
};

export default useIsAuth;
