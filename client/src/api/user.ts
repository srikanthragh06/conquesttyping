import { AxiosError } from "axios";
import client from "./client";

export const getMainStatsApi = async (userId: number) => {
    try {
        const res = await client.get(`/user/get-main-stats/${userId}`);
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const getProgressPlotApi = async (userId: number) => {
    try {
        const res = await client.get(`/user/get-progress-plot/${userId}`);
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};

export const leaderboardApi = async () => {
    try {
        const res = await client.get(`/user/leaderboard`);
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};
