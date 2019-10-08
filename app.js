const express = require("express");
const app = express();
//Define the logging package called 'morgan'
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

//Configure dotenv package
dotenv.config();

//Import users routes
const userRoutes = require("./api/routes/users/user");
//Import post routes
const postsRoutes = require("./api/routes/posts/posts");

//Mongodb connection
mongoose.connect(process.env.CONNECTION_STRING + process.env.DB_NAME, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

//Setup morgan midleware
app.use(morgan("dev"));

//Setup body parser midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS errors
app.use(cors());
//Serve static files
app.use(express.static(path.join(__dirname, "public")));

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
