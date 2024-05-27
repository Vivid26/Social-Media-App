import multer from 'multer';
import path from "path";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.resolve(path.join("public","images"));
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const name = Date.now().toString() + '-' + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});