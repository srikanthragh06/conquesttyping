import { Request } from "express";
import multer, { Multer, FileFilterCallback } from "multer";

interface MulterFile extends Express.Multer.File {}

const storage = multer.diskStorage({});

const imageFileFilter = (
    req: Request,
    file: MulterFile,
    cb: FileFilterCallback
) => {
    if (!file.mimetype.startsWith("image")) {
        cb(new Error("Supports only image files"));
    } else {
        cb(null, true);
    }
};

const videoFileFilter = (
    req: Request,
    file: MulterFile,
    cb: FileFilterCallback
) => {
    if (!file.mimetype.startsWith("video")) {
        cb(new Error("Supports only video files"));
    } else {
        cb(null, true);
    }
};

export const uploadImage: Multer = multer({
    storage,
    fileFilter: imageFileFilter,
});
export const uploadVideo: Multer = multer({
    storage,
    fileFilter: videoFileFilter,
});
