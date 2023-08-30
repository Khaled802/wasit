import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename files to avoid conflicts
  },
});

export const upload = multer({ storage: storage });
