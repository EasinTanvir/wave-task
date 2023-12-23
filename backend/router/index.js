const express = require("express");
const router = express.Router();
const fileUpload = require("../helper/file-config");
router.route("/image").post(fileUpload.single("image"), (req, res) => {
  res.status(201).json({ message: "Image upload successful" });
});
module.exports = router;
