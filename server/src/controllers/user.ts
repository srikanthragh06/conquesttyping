import { NextFunction, Request, Response } from "express";
import { queryClient, transaction } from "../db/db";
import { findAllWithCondition, findOneWithCondition } from "../db/queries";
import {
    sendClientSideError,
    sendServerSideError,
    sendSuccessResponse,
} from "../utils/responseTemplates";
import { getGroupLabels, groupAverages } from "../utils/utils";

export const getMainStatsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        if (!userId) return sendClientSideError(req, res, "userId is missing!");
        if (!(!isNaN(Number(userId)) && Number.isInteger(Number(userId))))
            return sendClientSideError(req, res, "userId must be an integer");

        await transaction(async (client) => {
            const mainStats = await findOneWithCondition(
                client,
                "Users",
                ["practiceTests", "timeTyping", "accuracy", "cpm", "wpm"],
                { id: userId }
            );

            if (!mainStats)
                return sendClientSideError(
                    req,
                    res,
                    `User with userId:${userId} does not exist`
                );
            return sendSuccessResponse(
                req,
                res,
                "User Main Stats retreived successfully",
                200,
                { mainStats }
            );
        });
    } catch (err) {
        next(err);
    }
};

export const getProgressPlotHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        if (!userId) return sendClientSideError(req, res, "userId is missing!");
        if (!(!isNaN(Number(userId)) && Number.isInteger(Number(userId))))
            return sendClientSideError(req, res, "userId must be an integer");

        await transaction(async (client) => {
            const userDetails = await findOneWithCondition(
                client,
                "Users",
                ["id", "practiceTests"],
                { id: userId }
            );
            if (!userDetails)
                return sendClientSideError(
                    req,
                    res,
                    `User with userId:${userId} does not exist`
                );
            const { practiceTests } = userDetails;
            const tests = await findAllWithCondition(
                client,
                "PracticeTests",
                ["cpm"],
                { userId }
            );
            const groupSize = Math.max(Math.floor(practiceTests / 20), 1);
            const cpms = tests.map((test) => test.cpm);
            const values = groupAverages(cpms, groupSize);
            const labels = getGroupLabels(cpms.length, groupSize, "Test");

            return sendSuccessResponse(
                req,
                res,
                `Progress plot data for user:${userId} retreived successfully`,
                200,
                {
                    labels,
                    values,
                }
            );
        });
    } catch (err) {
        next(err);
    }
};

export const leaderboardHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await transaction(async (client) => {
            const leaderboard = await queryClient(
                client,
                `
                SELECT username, "practiceTests" , accuracy, "timeTyping" , cpm, wpm
                FROM "Users"
                WHERE "practiceTests">0
                ORDER BY cpm DESC
                LIMIT 10
                `
            );

            if (!leaderboard || !leaderboard.rows) {
                return sendClientSideError(
                    req,
                    res,
                    "Failed to get leaderboard"
                );
            }

            return sendSuccessResponse(
                req,
                res,
                "Top 10 users by CPM retrieved successfully",
                200,
                { leaderboard: leaderboard.rows }
            );
        });
    } catch (err) {
        next(err);
    }
};
