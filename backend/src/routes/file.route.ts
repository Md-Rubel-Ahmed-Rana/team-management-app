import { uploadFileMiddleware } from "@/configurations/cloudinary";
import { UploadFileController } from "@/controllers/uploadFile.controller";
import { Router } from "express";

const router = Router();

router.post(
  "/single-image",
  uploadFileMiddleware.singleImage.single("image"),
  UploadFileController.uploadSingleImage
);

router.post(
  "/multiple-image",
  uploadFileMiddleware.multipleImage.array("images"),
  UploadFileController.uploadMultipleImage
);

router.post(
  "/single-file",
  uploadFileMiddleware.singleImage.single("file"),
  UploadFileController.uploadSingleFile
);

router.post(
  "/multiple-files",
  uploadFileMiddleware.multipleImage.array("files"),
  UploadFileController.uploadMultipleFile
);

export const FileUploadRoutes = router;