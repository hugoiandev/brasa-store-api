import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "../uploads/",
  filename(req, file, callback) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
