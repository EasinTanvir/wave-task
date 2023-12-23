const multer = require("multer");

const Mime_Type = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload_images");
    },
    filename: (req, file, cb) => {
      const ext = Mime_Type[file.mimetype];
      cb(null, Date.now() + "." + ext);
    },
  }),
});

module.exports = fileUpload;
