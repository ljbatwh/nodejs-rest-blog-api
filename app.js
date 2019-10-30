const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

//Import routes
const userRoutes = require("./api/v1/routes/user.rutes");
const postRoutes = require("./api/v1/routes/post.routes");
const categoryRoutes = require("./api/v1/routes/category.rutes");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongodb atlas...");
  })
  .catch(error => {
    console.log(`Connection to mongodb atlas was not successful!`, error);
  });

//Handle CORS errors
app.use(cors());
app.use(express.json());

//Logger
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/categories", categoryRoutes);

//Error handling
//General 404 error
app.use("/", (req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});
//All other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || "Unhandled error occured",
      status: error.status || 500
    }
  });
});
module.exports = app;
