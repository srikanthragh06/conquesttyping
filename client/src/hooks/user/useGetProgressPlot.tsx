import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { getProgressPlotApi } from "../../api/user";

const useGetProgressPlot = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { id: userId } = useAuthStore((state) => state.userDetails);

    const [progressPlot, setProgressPlot] = useState<{
        labels: string[];
        values: number[];
    } | null>(null);
    const [getProgressPlotError, setGetProgressPlotError] = useState<
        string | null
    >(null);
    const [getProgressPlotIsLoading, setGetProgressPlotIsLoading] =
        useState<boolean>(false);

    const handleGetProgressPlot = async () => {
        if (!isLoggedIn) return;

        setGetProgressPlotIsLoading(true);
        try {
            const res = await getProgressPlotApi(userId as number);
            if (res) {
                if (!res.data.error) {
                    setProgressPlot(res.data);
                    setGetProgressPlotError("");
                } else {
                    setProgressPlot(null);
                    setGetProgressPlotError(res.data.error);
                }
            } else {
                setProgressPlot(null);
                setGetProgressPlotError("No response from server.");
            }
        } catch (error) {
            console.error(error);
            setProgressPlot(null);
            setGetProgressPlotError(
                "Could not retreive main user stats due to an unknown error :(."
            );
        } finally {
            setGetProgressPlotIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetProgressPlot();
    }, [isLoggedIn]);

    return { getProgressPlotError, getProgressPlotIsLoading, progressPlot };
};

export default useGetProgressPlot;
