const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { createDir, removeDir } = require("../../shared/functions/index");

//Import post schema
const User = require("../../schemas/user.schema");
const Post = require("../../schemas/post.schema");

//Create a new user
router.post("/", (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      // Creates directory for each new user
      createDir(user.username)
        .then(created => {
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
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
        res.status(200).json(users);
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
  User.findById(userId)
    .exec()
    .then(user => {
      if (user) {
        User.deleteOne({ _id: user._id })
          .exec()
          .then(deleteResult => {
            removeDir(user.username)
              .then(deleted => {
                res.status(204).json({
                  userDeleted: deleteResult,
                  fileDeleted: deleted
                });
              })
              .catch(error => {
                res.status(500).json(error);
              });
          })
          .catch(error => {
            res.status(500).json({ error: error });
          });
      }
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
            res.status(200).json(posts);
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
