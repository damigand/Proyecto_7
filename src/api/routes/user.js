const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUserById);

router.get("/name/:username", controller.getUserByUsername);

router.post("/create", controller.createUser);

router.post("/login", controller.loginUser);

router.put("/edit/:id", controller.editUser);

router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
