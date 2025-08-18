import { Router } from "express";

export default function createMeetupRoutes(meetupController) {
  const router = Router();
  router.get("/", meetupController.getAllMeetups);
  router.get("/:id", meetupController.getMeetup);
  router.post("/", isAuth, isOrganizer, meetupController.createMeetup);
  router.put("/:id", isAuth, isOrganizer, meetupController.updateMeetup);
  router.delete("/:id", isAuth, isOrganizer, meetupController.deleteMeetup);
  return router;
}

// import * as meetupController from "../controllers/meetup.controllers.js";
// import isAuth from "../middleware/auth.middleware.js";
// import isOrganizer from "../middleware/role.middleware.js";

// router.get("/", meetupController.getAllMeetups);
// router.get("/:id", meetupController.getMeetup);

// router.post("/", isAuth, isOrganizer, meetupController.createMeetup);

// router.put("/:id", isAuth, isOrganizer, meetupController.updateMeetup);

// router.delete("/:id", isAuth, isOrganizer, meetupController.deleteMeetup);

// export default router;
