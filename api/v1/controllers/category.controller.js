const Category = require("../models/category.model");
const mongoose = require("mongoose");

exports.getCategories=(req,res,next)=>{
    Category.find()
    .exec()
    .then(categories => {
      res.status(200).json(categories);
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
exports.getCategory=(req,res,next)=>{
  const categoryId=req.params.id;
  Category.find({_id:categoryId})
  .exec()
  .then(category=>{
    if(category && category.length>0){
      res.status(200).json(category);
    }else{
      res.status(404).json({
        message: "No category found for the provided category id!"
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
exports.createCategory=(req,res,next)=>{
    // {description:req.body.description}
   Category.find()
  .exec()
  .then(categories=>{  
    const category = categories.find(c=>c.description === req.body.description || c.categoryType === parseInt(req.body.categoryType));
    const categoryType = categories.find(c=>c.categoryType === req.body.categoryType);

    if(category || categoryType){
      res.status(409).json({
        message:'There is allready a category with this value!',
        category:category
      });
    }else{
      const newCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        description:req.body.description,
        categoryType:req.body.categoryType,
        createdAt: new Date()
      });
      newCategory
        .save()
        .then(result => {
          res.status(200).json(result);
        })
        .catch(error => {
          res.status(error.status || 500).json({
            error: {
              message: error.message || "Internal Server Error",
              status: error.status || 500
            }
          });
        });
    }
  })
  .catch(er=>{
    res.status(er.status || 500).json({
      error: {
        message: er.message || "Internal Server Error",
        status: er.status || 500
      }
    });
  });
};
exports.updateCategory=(req,res,next)=>{
    Category.findById(req.params.id)
  .exec()
  .then(doc=>{
    if(doc.id === req.params.id){
      Category.updateOne({_id:req.params.id},req.body)
      .exec()
      .then(result=>{
        if(result.ok === 1){
          Category.findById({_id:req.params.id})
          .exec()
          .then(category=>{
            res.status(200).json(category);
          })
          .catch(e=>{
            res.status(e.status || 404).json({
              error: {
                message: e.message || "Category not found for provided category id",
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
    const error = new Error('Category not found for provided category id');
     next(error);
    }
  })
  .catch(error=>{
    next(error)
  }); 
};
exports.deleteCategory=(req,res,next)=>{
    const categoryId=req.params.id;
    Category.find({_id:categoryId})
    .exec()
    .then(doc=>{
      if(doc && doc.length>0){
        Category.deleteOne({_id:categoryId})
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
          message: "No category found for the provided category id!"
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