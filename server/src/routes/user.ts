import express from "express";
import {
    getMainStatsHandler,
    getProgressPlotHandler,
} from "../controllers/user";

const router = express.Router();

router.route("/get-main-stats/:userId").get(getMainStatsHandler);

router.route("/get-progress-plot/:userId").get(getProgressPlotHandler);

export default router;
