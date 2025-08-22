import { Router } from "express";

export default function createAuthRoutes(authController) {
  const router = Router();
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authController.me);
  return router;
}
