import { Router } from "express";
// import { AuthController } from "../infrastructures/controllers/auth.controller"; // импортировал и хз ошибка ли

export default function createAuthRoutes(authController) {
  const router = Router();
  router.post("/register", authController.register); // добавил так, хз ошибка ли
  router.post("/login", authController.login);
  router.get("/me", authController.me);
  return router;
}

// import express from "express";
// import * as authCtrl from "../controllers/auth.controller.js";
// import isAuth from "../../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/register", authCtrl.register);
// router.post("/login", authCtrl.login);
// router.get("/me", isAuth, authCtrl.me);

// export default router;
