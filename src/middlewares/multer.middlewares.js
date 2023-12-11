import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, extname, join } from "path";
import { IMAGE_MIMETYPES } from "../../config.js";
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const multerStorage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../public/uploads"),
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

export const multerUpload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (IMAGE_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.mimeError = `Only ${IMAGE_MIMETYPES.join(" ")} mimetypes are allowed`;
      cb(null, false);
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

export const handleFileSizeError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "file size is too large" });
    }
  }

  next(err);
};
