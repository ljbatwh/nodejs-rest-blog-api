const express = require("express");
const router = express.Router();

//Import controllers
const userController = require("../controllers/user.controller");


//User Routes
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);

//Export Router
module.exports = router;
