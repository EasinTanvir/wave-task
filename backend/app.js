const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const imageRoute = require("./router");

app.use(cors());
app.use("/upload_images", express.static(path.join("upload_images")));

app.use("/api", imageRoute);

app.listen(5000, () => console.log("server running"));
