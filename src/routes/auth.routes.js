import express from "express";
const router = express.Router();
import authCtrl from "../controllers/auth.controller.js";
import isAuth from "../middleware/auth.middleware.js";

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", isAuth, authCtrl.me);

export default router;
