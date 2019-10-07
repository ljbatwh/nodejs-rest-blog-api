const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Import post schema
const User = require("../../schemas/user.schema");
const Post = require("../../schemas/post.schema");

//Create a new user
router.post("/", (req, res, next) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: new Date(req.body.birthDate),
    userName: req.body.userName,
    email: req.body.email,
    createdAt: new Date()
  });

  user
    .save()
    .then(user => {
      res.status(201).json({
        message: "User created successfully!",
        user: user
      });
    })
    .catch(error => {
      res.status(error.status || 500).json({
        error: error
      });
    });
});

//Get all Users
router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      if (users) {
        res.status(200).json({
          users: users,
          total: users.length
        });
      } else {
        res.status(404).json({
          message: "No users found."
        });
      }
    })
    .catch(error => {
      res.status = error.status || 500;
      res.json({
        error: error
      });
    });
});

//Get a user by id
router.get("/:userId", (req, res, next) => {
  let userId = req.params.userId;
  User.findById(userId)
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No user found for provided id." });
      }
    })
    .catch(error => {
      res.status(error || 500).json({ error: error });
    });
});

/**
 * Update a user by id
 * USASE: Sent a patch request with a body like bellow
 * [
    {
        "propName": "firstName",
        "value": "Anastasios"
    }
  ]
  An array with kay value object for the porperties witch we want to update
  and provide a new value for it!
 */
router.patch("/:userId", (req, res, next) => {
  let userId = req.params.userId;
  const updateOps = {};
  for (ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.updateOne({ _id: userId }, { $set: updateOps })
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

//Delete one user by id
router.delete("/:userId", (req, res, next) => {
  let userId = req.params.userId;
  User.remove({ _id: userId })
    .exec()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

//Get a users posts
router.get("/:userId/posts", (req, res, next) => {
  let userId = req.params.userId;
  User.findById(userId)
    .exec()
    .then(user => {
      if (user) {
        Post.find()
          .where("user")
          .equals(userId)
          .exec()
          .then(posts => {
            res.status(200).json({
              posts: posts,
              total: posts.length
            });
          })
          .catch(error => {
            res.status(error || 500).json({ error: error });
          });
      } else {
        res.status(404).json({ message: "No user found for provided id." });
      }
    })
    .catch(error => {
      res.status(error || 500).json({ error: error });
    });
});

module.exports = router;
