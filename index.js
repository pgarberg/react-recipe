const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const router = require("./routes/index");

const connectDB = require("./config/db");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 4000;

mongoose.connection.on("error", (err) => {
  console.log("ON MONGO ERROR : ", err);
});

app.use("/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON 4000");
});
