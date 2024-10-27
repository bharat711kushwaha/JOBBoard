import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory
export const singleUpload = multer({storage}).single("file");
