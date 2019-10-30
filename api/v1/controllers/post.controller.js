const Post = require("../models/post.model");
const mongoose = require("mongoose");

exports.getPosts = (req, res, next) => {
 res.status(200).json({message:'getPosts'});
};

exports.createPost = (req, res, next) => {
    res.status(200).json({message:'createPost'});
};

exports.getPost=(req,res,next)=>{
    res.status(200).json({message:'getPost'});
};

exports.deletePost = (req,res,next)=>{
    res.status(200).json({message:'deletePost'});
};

exports.updatePost=(req,res,next)=>{
    res.status(200).json({message:'updatePost'});
};