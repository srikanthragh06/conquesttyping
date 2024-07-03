import { NextFunction, Request, Response } from "express";
import { insertRecord, updateRecords } from "../db/queries";
import { queryClient, transaction } from "../db/db";
import { sendSuccessResponse } from "../utils/responseTemplates";

export const addTestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            mode,
            startTime,
            endTime,
            timeTaken,
            accuracy,
            wpm,
            cpm,
            nCharacters,
            nCorrectCharacters,
            nIncorrectCharacters,
            nCorrectWords,
        } = req.body;
        const { user } = req as any;

        await transaction(async (client) => {
            await insertRecord(client, "PracticeTests", {
                userId: user.id,
                mode,
                startTime,
                endTime,
                timeTaken,
                accuracy,
                wpm,
                cpm,
                nCharacters,
                nCorrectCharacters,
                nIncorrectCharacters,
                nCorrectWords,
            });

            const { practiceTests } = user;

            let nAvgTests: number;
            if (Math.ceil(practiceTests / 20) > 5)
                nAvgTests = Math.ceil(practiceTests / 20);
            else if (practiceTests + 1 < 5) nAvgTests = practiceTests + 1;
            else nAvgTests = 5;

            const { rows: tests } = await queryClient(
                client,
                `SELECT "timeTaken", "accuracy", "cpm", "wpm"
                FROM "PracticeTests"
                ORDER BY "endTime" DESC
                LIMIT ${nAvgTests}; `
            );
            const newTimeTyping = user.timeTyping + timeTaken;
            const newAccuracy =
                tests.reduce((sum, test) => sum + test.accuracy, 0) / nAvgTests;
            const newCPM =
                tests.reduce((sum, test) => sum + test.cpm, 0) / nAvgTests;
            const newWPM =
                tests.reduce((sum, test) => sum + test.wpm, 0) / nAvgTests;

            await updateRecords(
                client,
                "Users",
                {
                    practiceTests: user.practiceTests + 1,
                    timeTyping: newTimeTyping,
                    accuracy: newAccuracy,
                    cpm: newCPM,
                    wpm: newWPM,
                },
                { id: user.id }
            );

            return sendSuccessResponse(req, res, "Test saved successfully!");
        });
    } catch (err) {
        next(err);
    }
};
