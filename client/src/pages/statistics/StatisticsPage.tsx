import { useEffect } from "react";
import LinePlot from "../../components/LinePlot";
import Loader from "../../components/Loader";
import MainPage from "../../components/MainPage";
import useGetMainStats from "../../hooks/user/useGetMainStats";
import useGetProgressPlot from "../../hooks/user/useGetProgressPlot";
import { useAuthStore } from "../../store/authStore";
import Statistic from "./Statistic";

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const pad = (num: number): string => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

const StatisticsPage = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const { getMainStatsError, getMainStatsIsLoading, mainStats } =
        useGetMainStats();

    const { progressPlot, getProgressPlotIsLoading } = useGetProgressPlot();
    useEffect(() => {
        console.log(progressPlot);
    }, [progressPlot]);

    return (
        <MainPage
            hasNavbar={true}
            className="items-center"
            authRequired={false}
            noAuthRequired={false}
        >
            {!isLoggedIn ? (
                <div
                    className="mt-60
                                lg:text-3xl md:text-2xl text-lg"
                >
                    Sign in to access your detailed typing statistics.
                </div>
            ) : (
                <>
                    {getMainStatsIsLoading ? (
                        <Loader
                            className="animate-spin 
                                        lg:text-6xl md:text-4xl sm:text-3xl text-2xl mt-10"
                        />
                    ) : getMainStatsError ? (
                        <div className="text-red-700 text-lg mt-24">
                            Could not load main user stats due to unknown error
                            :(
                        </div>
                    ) : (
                        <div
                            className="bg-color2 rounded-lg
                                            lg:px-8 lg:py-4 md:px-4 md:py-2 px-2 py-1
                                            mt-6 
                                            flex flex-col space-y-5"
                        >
                            <div
                                className="flex w-full 
                            lg:space-x-12 md:space-x-8 space-x-6"
                            >
                                <Statistic
                                    label="Tests"
                                    value={
                                        mainStats
                                            ? mainStats.practiceTests.toString()
                                            : "0"
                                    }
                                />
                                <Statistic
                                    label="Time Typing"
                                    value={
                                        mainStats
                                            ? formatTime(mainStats.timeTyping)
                                            : "00:00:00"
                                    }
                                />
                                <Statistic
                                    label="Accuracy"
                                    value={
                                        mainStats
                                            ? `${mainStats.accuracy.toFixed(
                                                  2
                                              )}%`
                                            : "0%"
                                    }
                                />
                                <Statistic
                                    label="CPM"
                                    value={
                                        mainStats
                                            ? mainStats.cpm.toString()
                                            : "0"
                                    }
                                />
                                <Statistic
                                    label="WPM"
                                    value={
                                        mainStats
                                            ? mainStats.wpm.toString()
                                            : "0"
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {getProgressPlotIsLoading ? (
                        <Loader className="animate-spin text-3xl mt-10" />
                    ) : (
                        <>
                            <div
                                className="lg:mt-20 md:mt-16 mt-12
                                            mb-6 text-color4 opacity-60
                                            lg:text-3xl md:text-2xl text-xl"
                            >
                                CPM across practice tests
                            </div>
                            <LinePlot
                                className="border2 
                                        lg:w-[960px] md:w-[640px] sm:w-[400px] w-full 
                                        aspect-square 
                                        "
                                data={{
                                    labels: progressPlot
                                        ? progressPlot.labels
                                        : [],
                                    datasets: [
                                        {
                                            label: "CPM",
                                            data: progressPlot
                                                ? progressPlot.values
                                                : [],
                                            fill: true,
                                            backgroundColor: "#76ABAE",
                                            borderColor: "#76ABAE",
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                display: false,
                                            },
                                            grid: {
                                                color: "#31363F",
                                                display: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                color: "white",
                                            },
                                            grid: {
                                                color: "#31363F",
                                            },
                                            border: { display: false },
                                        },
                                    },
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </MainPage>
    );
};

export default StatisticsPage;
