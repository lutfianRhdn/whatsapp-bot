const express = require("express");
const { verifyToken } = require("../../middleware/auth.middleware");
const router = express.Router();
const {
	register,
	login,
	token,
	logout,
} = require("../controllers/auth.controller");
router.post("/login", login);
router.post("/register", register);
router.get("/token", token);
router.delete("/logout", verifyToken, logout);
module.exports = router;
