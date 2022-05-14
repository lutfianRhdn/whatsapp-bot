const express = require("express");
const router = express.Router();

const userRoute = require("./user.route.js");
const authRoute = require("./auth.route.js");
const whatsappRoute = require("./whatsapp.route.js");
router.use("/users", userRoute);
router.use("/whatsapp", whatsappRoute);

router.use("/", authRoute);

module.exports = router;
