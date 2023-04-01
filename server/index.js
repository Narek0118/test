require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT;
var bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send(req.body);
});
app.use("/api", router);
app.use(errorHandler);
app.use(fileUpload({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
var fileupload = require("express-fileupload");
app.use(fileupload());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server has been running with http://localhost:${PORT} port`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
