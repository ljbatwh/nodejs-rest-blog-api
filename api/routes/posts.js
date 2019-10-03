const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Import post schema
const Post = require("../models/post.model");

router.get("/", (req, res, next) => {
  Post.find().then(result=>{
    if(res){
      console.log('if res')
      res.status = 200;
      res.json({
        posts:result,
        total:result.length
      });
    }else{
      console.log('else')
      res.status = 204;
      res.json({
        posts:[],
        total:0
      });
    }
  }).catch(error=>{
    console.log('catch')
    res.status = error.status || 500;
    res.json({
      error: {
        message: error.message
      }
    });
  })
});

router.post("/", (req, res, next) => {
  const post = new Post({
    // _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    published: new Date(req.body.published),
    author: req.body.author,
    content: req.body.content,
    externalUrl:req.body.externalUrl
  });

  post
    .save()
    .then(result => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result
      });
    })
    .catch(error => {
      res.status(error.status || 500).json({
        error: {
          message: "Internal Server Error: " + error.message
        }
      });
    });
});

router.get("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  res.status(200).json({
    message: `Handle GET requests to posts/${postId}`
  });
});

router.patch("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  res.status(200).json({
    message: `Handle PATCH requests to posts/${postId}`
  });
});

router.delete("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  res.status(200).json({
    message: `andle DELETE requests to posts/${postId}`
  });
});
module.exports = router;
