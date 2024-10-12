const { signup, login, profile } = require("../controller/userController.js");

const authMiddleware = require("../middelware/auth.js");

const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.get("/:token", authMiddleware, profile);

module.exports = userRouter;
