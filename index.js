const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");

const router = require("./routes/index");

const connectDB = require("./config/db");

const passport = require("passport");

dotenv.config();

require("./config/passport");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Call our mongoose instance to connect
connectDB();

//Passport setup - For using sessions, the three (3) following lines must be called in this order
app.use(
  session({
    secret: "keyboardCat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 Days
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Log error if mongoose encounters any errors after connecting
mongoose.connection.on("error", (err) => {
  console.log("ON MONGO ERROR : ", err);
});

//Handling all of our route requests
app.use("/", router);

//Required code for Heroku deploy
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON 4000");
});
