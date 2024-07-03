import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { sendClientSideError } from "../utils/responseTemplates";

export const addTestValidation = [
    body("mode")
        .exists()
        .withMessage("Mode is required")
        .isIn(["time", "words"])
        .withMessage("Mode must be either 'time' or 'words'"),
    body("startTime")
        .exists()
        .withMessage("Start time is required")
        .isISO8601()
        .withMessage("Start time must be a valid timestamp"),
    body("endTime")
        .exists()
        .withMessage("End time is required")
        .isISO8601()
        .withMessage("End time must be a valid timestamp"),
    body("timeTaken")
        .exists()
        .withMessage("Time taken is required")
        .isFloat({ min: 0 })
        .withMessage("Time taken must be a non-negative integer"),
    body("accuracy")
        .exists()
        .withMessage("Accuracy is required")
        .isFloat({ min: 0, max: 100 })
        .withMessage("Accuracy must be a float between 0 and 100"),
    body("wpm")
        .exists()
        .withMessage("WPM is required")
        .isFloat({ min: 0 })
        .withMessage("WPM must be a non-negative integer"),
    body("cpm")
        .exists()
        .withMessage("CPM is required")
        .isFloat({ min: 0 })
        .withMessage("CPM must be a non-negative integer"),
    body("nCharacters")
        .exists()
        .withMessage("Number of characters is required")
        .isInt({ min: 0 })
        .withMessage("Number of characters must be a non-negative integer"),
    body("nCorrectCharacters")
        .exists()
        .withMessage("Number of correct characters is required")
        .isInt({ min: 0 })
        .withMessage(
            "Number of correct characters must be a non-negative integer"
        ),
    body("nIncorrectCharacters")
        .exists()
        .withMessage("Number of incorrect characters is required")
        .isInt({ min: 0 })
        .withMessage(
            "Number of incorrect characters must be a non-negative integer"
        ),
    body("nCorrectWords")
        .exists()
        .withMessage("Number of correct words is required")
        .isInt({ min: 0 })
        .withMessage("Number of correct words must be a non-negative integer"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(req, res, errors.array()[0].msg);
        }
        next();
    },
];
