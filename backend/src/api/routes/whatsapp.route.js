const express = require("express");
// const { verifyToken } = require("../../middleware/auth.middleware");
const router = express.Router();
const { login } = require("../controllers/whatsapp.controller");
// router.use(verifyToken);
router.get("/login", login);
module.exports = router;
