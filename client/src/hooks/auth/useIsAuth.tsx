import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

const useIsAuth = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    useEffect(() => {
        isAuth();
    }, []);
};

export default useIsAuth;
