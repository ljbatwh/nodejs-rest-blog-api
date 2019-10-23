const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.getUsers = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(error.status || 500).json({
        error: {
          message: error.message || "Internal Server Error",
          status: error.status || 500
        }
      });
    });
};

exports.createUser = (req, res, next) => {
  User.find({email:req.body.email})
  .exec()
  .then(doc=>{
    if(doc && doc.length>0){
      res.status(409).json({
        message:'There is allready a user with this e-mail!',
        user:doc
      });
    }else{
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: new Date(req.body.birthDate),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date()
      });

      user
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(error.status || 500).json({
            error: {
              message: error.message || "User was not created successfuly!",
              status: error.status || 500
            }
          });
        });
    }
  })
  .catch(er=>{
    res.status(er.status || 500).json({
      error: {
        message: er.message || "User was not created successfuly!",
        status: er.status || 500
      }
    });
  });
};

exports.getUser=(req,res,next)=>{
  const userId=req.params.id;
  User.find({_id:userId})
  .exec()
  .then(doc=>{
    if(doc && doc.length>0){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message: "No user found for the provided user id!"
      });
    }
  })
  .catch(error=>{
    res.status(error.status || 500).json({
      error: {
        message: error.message || "Internal Server Error",
        status: error.status || 500
      }
    });
  })
};

exports.deleteUser = (req,res,next)=>{
  const userId=req.params.id;
  User.find({_id:userId})
  .exec()
  .then(doc=>{
    if(doc && doc.length>0){
      User.deleteOne({_id:userId})
      .exec().then(result=>{
          res.status(401).json(result);
      })
      .catch(er=>{
        res.status(er.status || 500).json({
          error: {
            message: er.message || "Internal Server Error",
            status: er.status || 500
          }
        });
      });
    }else{
      res.status(404).json({
        message: "No user found for the provided user id!"
      });
    }
  })
  .catch(error=>{
    res.status(error.status || 500).json({
      error: {
        message: error.message || "Internal Server Error",
        status: error.status || 500
      }
    });
  })
};

exports.updateUser=(req,res,next)=>{
  User.findById(req.params.id)
  .exec()
  .then(doc=>{
    if(doc.id === req.params.id){
      User.updateOne({_id:req.params.id},req.body)
      .exec()
      .then(result=>{
        if(result.ok === 1){
          User.findById({_id:req.params.id})
          .exec()
          .then(user=>{
            res.status(200).json(user);
          })
          .catch(e=>{
            res.status(e.status || 404).json({
              error: {
                message: e.message || "User not found for provided id",
                status: e.status || 404
              }
             });
          })
        }
       
      })
      .catch(error=>{
       res.status(error.status || 500).json({
        error: {
          message: error.message || "Internal Server Error",
          status: error.status || 500
        }
       });
      })
    }else{
    const error = new Error('User not found for provided id');
     next(error);
    }
  })
  .catch(error=>{
    next(error)
  });
};