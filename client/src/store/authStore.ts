import { create } from "zustand";
import { getAuthToken } from "../utils/token";
import { isAuthApi } from "../api/auth";

type userDetailsType = {
    id: number | null;
    username: string | null;
    email: string | null;
    isVerified: boolean | null;
    isGoogleAuth: boolean | null;
    createdAt: Date | null;
    lastActive: Date | null;
};

type AuthStoreType = {
    isLoggedIn: boolean;
    userDetails: userDetailsType;
    isAuthLoading: boolean;
    isAuth: () => Promise<boolean>;
    setUserDetails: (userDetails: userDetailsType) => void;
    removeUserDetails: () => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => {
    return {
        isLoggedIn: false,
        userDetails: {
            id: null,
            username: null,
            email: null,
            isVerified: null,
            isGoogleAuth: null,
            createdAt: null,
            lastActive: null,
        },
        isAuthLoading: false,
        isAuth: async () => {
            set((state) => ({ ...state, isAuthLoading: true }));

            const token = getAuthToken();
            if (!token) {
                set((state) => ({
                    ...state,
                    isLoggedIn: false,
                    userDetails: {
                        id: null,
                        username: null,
                        email: null,
                        isVerified: null,
                        isGoogleAuth: null,
                        createdAt: null,
                        lastActive: null,
                    },
                    isAuthLoading: false,
                }));
                return false;
            }

            try {
                const res = await isAuthApi(token);
                if (res) {
                    if (!res.data.error) {
                        const {
                            id,
                            username,
                            email,
                            isVerified,
                            isGoogleAuth,
                            createdAt,
                            lastActive,
                        } = res.data.user;
                        set((state) => ({
                            ...state,
                            isLoggedIn: true,
                            userDetails: {
                                id,
                                username,
                                email,
                                isVerified,
                                isGoogleAuth,
                                createdAt,
                                lastActive,
                            },
                        }));
                        return true;
                    } else {
                        set((state) => ({
                            ...state,
                            isLoggedIn: false,
                            userDetails: {
                                id: null,
                                username: null,
                                email: null,
                                isVerified: null,
                                isGoogleAuth: null,
                                createdAt: null,
                                lastActive: null,
                            },
                        }));
                        return false;
                    }
                } else {
                    set((state) => ({
                        ...state,
                        isLoggedIn: false,
                        userDetails: {
                            id: null,
                            username: null,
                            email: null,
                            isVerified: null,
                            isGoogleAuth: null,
                            createdAt: null,
                            lastActive: null,
                        },
                    }));
                    return false;
                }
            } catch (err) {
                console.error(err);
                set((state) => ({
                    ...state,
                    isLoggedIn: false,
                    userDetails: {
                        id: null,
                        username: null,
                        email: null,
                        isVerified: null,
                        isGoogleAuth: null,
                        createdAt: null,
                        lastActive: null,
                    },
                }));
                return false;
            } finally {
                set((state) => ({ ...state, isAuthLoading: false }));
            }
        },
        setUserDetails: (userDetails) => {
            set((state) => ({ ...state, userDetails: { ...userDetails } }));
        },
        removeUserDetails: () => {
            set((state) => ({
                ...state,
                userDetails: {
                    id: null,
                    username: null,
                    email: null,
                    isVerified: null,
                    isGoogleAuth: null,
                    createdAt: null,
                    lastActive: null,
                },
            }));
        },
        setIsLoggedIn: (isLoggedIn) => {
            set((state) => ({ ...state, isLoggedIn }));
        },
    };
});
