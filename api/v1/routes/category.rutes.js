const express = require("express");
const router = express.Router();

//Import category controller
const categoryController = require("../controllers/category.controller");

//Category Routes
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:id", categoryController.getCategory);
router.get("/", categoryController.getCategories);

//Export Router
module.exports = router;
