const express = require("express");
const router = express.Router();

//Import controllers
const postController = require("../controllers/post.controller");


//Post Routes
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.post("/", postController.createPost);

//Export Router
module.exports = router;
