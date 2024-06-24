// import cloudinary from "../cloud/index";
// import { UploadApiResponse } from "cloudinary";
// import { logCloudUploads } from "./logging";

// export const uploadCloudinaryImage = async (
//     file: Express.Multer.File,
//     options: any = {}
// ): Promise<UploadApiResponse> => {
//     let upload: UploadApiResponse;
//     try {
//         upload = await cloudinary.uploader.upload(file.path, {
//             quality: "auto:good",
//             fetch_format: "auto",
//             eager: [{ quality: "auto:good", fetch_format: "auto" }],
//             ...options,
//         });
//         logCloudUploads(upload.url);

//         return upload;
//     } catch (err: any) {
//         logCloudUploads(upload.url, err);
//         throw err;
//     }
// };

// export const destroyCloudinaryImage = async (url: string): Promise<any> => {
//     try {
//         const publicId = url.split("/").pop()?.split(".")[0];
//         if (!publicId) {
//             throw new Error("Invalid Cloudinary URL");
//         }

//         const result = await cloudinary.uploader.destroy(publicId);
//         return result;
//     } catch (error: any) {
//         throw error;
//     }
// };
