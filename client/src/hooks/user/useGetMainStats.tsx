import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { getMainStatsApi } from "../../api/user";

const useGetMainStats = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { id: userId } = useAuthStore((state) => state.userDetails);

    const [mainStats, setMainStats] = useState<{
        practiceTests: number;
        accuracy: number;
        timeTyping: number;
        wpm: number;
        cpm: number;
    } | null>(null);
    const [getMainStatsError, setGetMainStatsError] = useState<string | null>(
        null
    );
    const [getMainStatsIsLoading, setGetMainStatsIsLoading] =
        useState<boolean>(false);

    const handleGetMainStats = async () => {
        if (!isLoggedIn) return;

        setGetMainStatsIsLoading(true);
        try {
            const res = await getMainStatsApi(userId as number);
            if (res) {
                if (!res.data.error) {
                    setMainStats(res.data.mainStats);
                    setGetMainStatsError("");
                } else {
                    setMainStats(null);
                    setGetMainStatsError(res.data.error);
                }
            } else {
                setMainStats(null);
                setGetMainStatsError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setMainStats(null);
            setGetMainStatsError(
                "Could not retreive main user stats due to an unknown error :(."
            );
        } finally {
            setGetMainStatsIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetMainStats();
    }, [isLoggedIn]);

    return { getMainStatsError, getMainStatsIsLoading, mainStats };
};

export default useGetMainStats;
