import express from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import isAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", isAuth, authCtrl.me);

export default router;
