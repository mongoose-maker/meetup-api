import { Router } from "express";

export default function createMeetupRoutes(meetupController) {
  const router = Router();
  router.get("/", meetupController.getAllMeetups);
  router.get("/:id", meetupController.getMeetup);
  router.post("/", meetupController.createMeetup);
  router.put("/:id", meetupController.updateMeetup);
  router.delete("/:id", meetupController.deleteMeetup);
  return router;
}

// import isAuth from "../infrastructures/middleware/auth.middleware";
// import isOrganizer from "../infrastructures/middleware/role.middleware";
// import * as meetupController from "../controllers/meetup.controllers.js";

// router.get("/", meetupController.getAllMeetups);
// router.get("/:id", meetupController.getMeetup);

// router.post("/", isAuth, isOrganizer, meetupController.createMeetup);

// router.put("/:id", isAuth, isOrganizer, meetupController.updateMeetup);

// router.delete("/:id", isAuth, isOrganizer, meetupController.deleteMeetup);

// export default router;
