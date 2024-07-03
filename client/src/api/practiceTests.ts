import { AxiosError } from "axios";
import client from "./client";

export const addPracticeTestApi = async (
    token: string,
    testDetails: {
        mode: string;
        startTime: Date;
        endTime: Date;
        timeTaken: number;
        accuracy: number;
        wpm: number;
        cpm: number;
        nCharacters: number;
        nCorrectCharacters: number;
        nIncorrectCharacters: number;
        nCorrectWords: number;
    }
) => {
    try {
        const res = await client.post("/practice-tests/add-test", testDetails, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });
        return res;
    } catch (err) {
        const error = err as AxiosError;
        return error.response;
    }
};
