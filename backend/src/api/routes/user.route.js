const express = require("express");
const { verifyToken } = require("../../middleware/auth.middleware");
const router = express.Router();
const { all } = require("../controllers/user.controller");
router.use(verifyToken);
router.get("/", all);
module.exports = router;
