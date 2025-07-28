const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const isAuth = require("../middleware/auth.middleware");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", isAuth, authCtrl.me);

module.exports = router;
