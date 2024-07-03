import express from "express";
import { isAuth } from "../middlewares/auth";
import { addTestValidation } from "../middlewares/practiceTests";
import { addTestHandler } from "../controllers/practiceTests";

const router = express.Router();

router.route("/add-test").post(isAuth, addTestValidation, addTestHandler);

export default router;
