import MainPage from "../../components/MainPage";
import useGetLeaderboard from "../../hooks/user/useGetLeaderboard";

const LeaderboardPage = () => {
    const { leaderboard, isLeaderboardLoading, leaderboardError } =
        useGetLeaderboard();

    return (
        <MainPage
            hasNavbar={true}
            className="items-center"
            authRequired={false}
            noAuthRequired={false}
        >
            <h1 className="mt-3">Top 10 (based on CPM)</h1>
            {isLeaderboardLoading ? (
                <p>Loading...</p>
            ) : leaderboardError ? (
                <p>Error loading leaderboard: {leaderboardError}</p>
            ) : !leaderboard || leaderboard.length === 0 ? (
                <p>Leaderboard unavailable</p>
            ) : (
                <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-color2 rounded-lg shadow-lg">
                    <table className="table-auto border-collapse border border-gray-400 text-sm w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">
                                    Rank
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Username
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Practice Tests
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Accuracy
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Time Typing
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    CPM
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    WPM
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.username}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.practiceTests}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.accuracy.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.timeTyping.toFixed(2)} s
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.cpm.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {entry.wpm.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </MainPage>
    );
};

export default LeaderboardPage;
