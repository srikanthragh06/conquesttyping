import { useEffect, useState } from "react";
import { leaderboardApi } from "../../api/user";

const useGetLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<any[] | null>([]);
    const [isLeaderboardLoading, setIsleaderboardLoading] = useState(false);
    const [leaderboardError, setLeaderboardError] = useState("");

    const handleGetLeaderboard = async () => {
        setIsleaderboardLoading(true);

        try {
            const res = await leaderboardApi();
            if (res) {
                if (!res.data.error) {
                    setLeaderboard(res.data.leaderboard);
                    setLeaderboardError("");
                } else {
                    setLeaderboard(null);
                    setLeaderboardError(res.data.error);
                }
            } else {
                setLeaderboard(null);
                setLeaderboardError("No response from server.");
            }
        } catch (err) {
            console.error(err);
            setLeaderboard(null);
            setLeaderboardError("Could not retreive leaderboard :().");
        } finally {
            setIsleaderboardLoading(false);
        }
    };

    useEffect(() => {
        handleGetLeaderboard();
    }, []);

    return { leaderboard, isLeaderboardLoading, leaderboardError };
};

export default useGetLeaderboard;
