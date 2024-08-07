import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import { logRequest } from "./utils/logging";
import {
    globalErrorHandler,
    incorrectJSONFormatHandler,
    urlNotFoundHandler,
} from "./middlewares/handlers";
import { consoleLogCyan } from "./utils/colorConsoleLogging";
import { sendSuccessResponse } from "./utils/responseTemplates";
import authRouter from "./routes/auth";
import practiceTestsRouter from "./routes/practiceTests";
import userRouter from "./routes/user";
import { testDatabaseConnection } from "./db/db";

config();

// Server Creation
const app = express();
const server = http.createServer(app);

// json parsing middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors configuration middleware
app.use(cors());

// handles incorrect json formats
app.use(incorrectJSONFormatHandler);

// log requests
app.use(logRequest);

app.get("/", (req: Request, res: Response) => {
    sendSuccessResponse(req, res, "I hear u!!!");
});

// Main routes
app.use("/api/auth", authRouter);
app.use("/api/practice-tests", practiceTestsRouter);
app.use("/api/user", userRouter);

// handle 404 error requests
app.use("/*", urlNotFoundHandler);

// global error handler
app.use(globalErrorHandler);

// listen on port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    consoleLogCyan(`Server is running at http://localhost:${PORT}`);
    testDatabaseConnection();
});
