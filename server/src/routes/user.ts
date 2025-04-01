import express from "express";
import {
    getMainStatsHandler,
    getProgressPlotHandler,
    leaderboardHandler,
} from "../controllers/user";

const router = express.Router();

router.route("/get-main-stats/:userId").get(getMainStatsHandler);

router.route("/get-progress-plot/:userId").get(getProgressPlotHandler);

router.route("/leaderboard").get(leaderboardHandler);

export default router;
