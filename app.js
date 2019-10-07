const express = require("express");
const app = express();
//Define the logging package called 'morgan'
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

//Configure dotenv package
dotenv.config();

//Import users routes
const userRoutes = require("./api/routes/users/user");
//Import post routes
const postsRoutes = require("./api/routes/posts/posts");

//Mongodb connection
mongoose.connect(process.env.CONNECTION_STRING + process.env.DB_NAME, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//Setup morgan midleware
app.use(morgan("dev"));

//Setup body parser midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS errors
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    res.status(200).json({});
  }
  next();
});

//Routes whitch should handle requests

app.use("/blog/api/users", userRoutes);
app.use("/blog/api/posts", postsRoutes);

//Error handling for 404 errors
app.use((req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message =
    "404 - Not found. All requests should be under the /blog/api route!";
  next(error);
});

app.use((error, req, res, next) => {
  res.status = error.status || 154;
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
