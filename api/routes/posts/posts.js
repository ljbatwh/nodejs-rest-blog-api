const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Import post schema
const Post = require("../../models/post.model");
const User = require("../../models/user.model");

//Create a new post
router.post("/", (req, res, next) => {
  User.findById(req.body.user)
    .exec()
    .then(author => {
      if (author) {
        const post = new Post({
          _id: mongoose.Types.ObjectId(),
          title: req.body.title,
          published: new Date(req.body.published),
          author: author,
          content: req.body.content,
          externalUrl: req.body.externalUrl,
          user: author._id
        });

        post
          .save()
          .then(result => {
            if (result["user"]) {
              result.user = undefined;
            }
            res.status(201).json({
              message: "Post created successfully!",
              post: result
            });
          })
          .catch(error => {
            res.status(error.status || 500).json({
              error: error
            });
          });
      } else {
        res.status(404).json({
          message: "User not found for provided id!"
        });
      }
    })
    .catch(error => {
      res.status(error.status || 500).json({
        error: error
      });
    });
});

//Get all posts
router.get("/", (req, res, next) => {
  Post.find()
    .select("_id title published author content externalUrl")
    .exec()
    .then(result => {
      if (res) {
        res.status(200).json({
          posts: result,
          total: result.length
        });
      } else {
        res.status(404).json({
          message: "No entries found."
        });
      }
    })
    .catch(error => {
      console.log("catch");
      res.status = error.status || 500;
      res.json({
        error: {
          message: error.message
        }
      });
    });
});

//Get a post by id
router.get("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  Post.findById(postId)
    .select("_id title published author content externalUrl")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

/**
 * Update a post by id
 * USASE: Sent a patch request with a body like bellow
 * [
    {
        "propName": "title",
        "value": "Angular Tools for High Performance!"
    }
  ]
  An array with kay value object for the porperties witch we want to update
  and provide a new value for it!
 */
router.patch("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  const updateOps = {};
  for (ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.updateOne({ _id: postId }, { $set: updateOps })
    .select("_id title published author content externalUrl")
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

//Delete one post by id
router.delete("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  Post.remove({ _id: postId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});
module.exports = router;
